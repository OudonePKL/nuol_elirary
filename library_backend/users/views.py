import base64
import os
import random
import string

import pytz
from django.db import transaction
from django.http import JsonResponse
from PIL import Image
import io
from django.core.files.base import ContentFile
import requests
from datetime import datetime

from django.contrib.auth.hashers import check_password
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404, redirect
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CheckEmail, UserModel
from .serializers import (
    UserSerializer,
    PostUserSerializer,
    GetUserSerializer,
)
from django.shortcuts import render
import smtplib
import jwt
from django.conf import settings
from rest_framework import generics, permissions


# Send email
class SendEmail(APIView):
    @swagger_auto_schema(
        tags=["Email Authentication"],
        request_body=PostUserSerializer,
        responses={200: "Success"},
    )
    def post(self, request):
        user_email = request.data.get("email")
        if not user_email:
            return Response(
                {"message": "Please enter your e-mail."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        random_code = "".join(
            random.choices(string.digits, k=6)
        )  # Generate 6-digit random string
        subject = "[E-Library] Membership verification code"
        body = f"Email verification code: {random_code}"  # Add to random code body
        email = EmailMessage(
            subject,
            body,
            to=[user_email],
        )
        email.send()

        # Save authentication code to DB
        code = CheckEmail.objects.create(code=random_code, email=user_email)
        return Response(
            {"message": "Your email has been sent. Please check your mailbox."},
            status=status.HTTP_200_OK,
        )


class CheckEmailView(APIView):
    def post(self, request):
        # # Most recent authentication code instance
        # code_obj = (
        # CheckEmail.objects.filter(email=email).order_by("-created_at").first()
        # )
        # # Check after deployment
        code = request.data.get("code")
        email = request.data.get("email")
        code_obj = CheckEmail.objects.filter(email=email, code=code).first()
        if code_obj is None:
            return Response(
                {"message": "No verification code was sent to that email."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tz = pytz.timezone("Asia/Vientiane")

        # If the authentication code has expired
        if code_obj.expires_at < datetime.now(tz=tz):
            code_obj.delete()
            return Response(
                {"message": "The verification code has expired."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        code_obj.delete()  # Delete email verification code
        return Response(
            {"message": "Email verification has been completed.", "is_checked": True},
            status=status.HTTP_200_OK,
        )


# join the membership
class SignupView(APIView):
    @swagger_auto_schema(
        tags=["join the membership"],
        request_body=PostUserSerializer,
        responses={200: "Success"},
    )
    def post(self, request):
        with transaction.atomic():
            email = request.data.get("email")
            code = request.data.get("code")
            password = request.data.get("password")
            password2 = request.data.get("password2")
            profile_image = request.data.get("profile_image")
            code_obj = CheckEmail.objects.filter(email=email, code=code).first()

            # Check whether the password and password match
            if password != password2:
                return JsonResponse(
                    {
                        "message": "Your password and password confirmation do not match."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check for email duplicates
            user = UserModel.objects.filter(email=email)
            if user.exists():
                return Response(
                    {"message": "The email already exists."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if code_obj is None:
                return Response(
                    {"message": "No verification code was sent to that email."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            tz = pytz.timezone("Asia/Vientiane")

            # If the verification code has expired
            if code_obj.expires_at < datetime.now(tz=tz):
                code_obj.delete()
                return Response(
                    {"message": "The verification code has expired."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if your email matches

            if profile_image == "undefined" or profile_image is None:
                # If the image comes as an empty value, use copy to change it!
                # deepcopy -> Import copy module? -> Complete copy! (safe)
                # Consider using try, except -> Additional exception handling!
                data = request.data.copy()
                data["profile_image"] = None
                serializer = UserSerializer(data=data)
            else:
                serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                code_obj.delete()  # Delete email verification code
                serializer.save()

                return Response(
                    {"message": "Your registration has been completed."},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"message": "Error, please check your data and try agin!"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

# log in
class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        data = request.data
        email = data.get("email")
        password = data.get("password")

        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return Response(data={"message": "Email does not exist."}, status=400)

        if not check_password(password, user.password):
            return Response(data={"message": "Incorrect password."}, status=400)

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            token = serializer.validated_data
            is_admin = user.is_admin
            is_director = user.is_director
            
            return Response(
                data={
                    "token": token,
                    "user_id": user.id,
                    "is_admin": is_admin,
                    "is_director": is_director,
                    "user_name": user.name,
                    "email": user.email if user.email else False,
                    "image": user.profile_image.url if user.profile_image else False,
                },
                status=200,
            )
        else:
            return Response(
                data={
                    "message": "An error occurred. Please contact the administrator."
                },
                status=400,
            )


# User-related logic
class UserView(APIView):
    def get(self, request):
        user = get_object_or_404(UserModel, email=request.user)
        data = {}
        data["user_info"] = GetUserSerializer(user).data
        return Response(data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        tags=["Password change and withdrawal"],
        request_body=PostUserSerializer,
        responses={200: "Success"},
    )
    def post(self, request):
        """
        <Reset password>
         Reset password if lost
        """
        email = request.data.get("email")
        password = request.data.get("password")
        password2 = request.data.get("password2")
        code = request.data.get("code")
        code_obj = CheckEmail.objects.filter(email=email, code=code).first()
        if code_obj is None:
            return Response(
                {"message": "No verification code was sent to that email."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tz = pytz.timezone("Asia/Vientiane")

        # If the verification code has expired
        if code_obj.expires_at < datetime.now(tz=tz):
            code_obj.delete()
            return Response(
                {"message": "The verification code has expired."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        code_obj.delete()  # Delete email verification code

        # Check if your email matches
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return Response(
                {"message": "Email does not exist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if password != password2:
            return Response(
                {"message": "Your passwords do not match."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Update password
        user.set_password(password)
        user.save()

        return Response(
            {"message": "Your password has been changed."}, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        tags=["Password change and withdrawal"],
        request_body=PostUserSerializer,
        responses={200: "Success"},
    )
    def patch(self, request):
        """
        <Change password>
         Change password after logging in
        """
        try:
            user = get_object_or_404(UserModel, id=request.user.id)
            origin_password = request.data.get("origin_password")
            new_password = request.data.get("password")
            check_new_password = request.data.get("password2")
            data = request.data.copy()
            image = request.data.get("profile_image")
            # Confirm new password & password match
            # if origin_password == '' or not new_password == '' or not check_new_password == '':
            #     data['password'] = None
            # When changing your password
            if (
                new_password != check_new_password
                or not new_password
                or not check_new_password
            ):
                return Response(
                    {"message": "New password does not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Verify original password matches
            if not check_password(origin_password, user.password):
                return Response(
                    {"message": "Passwords do not match"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if image == "undefined" or not image:
                data["profile_image"] = None

            if not new_password:
                print(data)
                user.profile_image = data["profile_image"]
                user.save()
                return Response(
                    {
                        "message": "Modifications completed!",
                        "image": (
                            user.profile_image.url if user.profile_image else False
                        ),
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                serializer = UserSerializer(user, data=data, partial=True)

                if serializer.is_valid():
                    serializer.save()
                    # If you change your password
                    return Response(
                        {
                            "message": "Modifications completed!",
                            "image": (
                                user.profile_image.url if user.profile_image else False
                            ),
                        },
                        status=status.HTTP_200_OK,
                    )
                else:
                    print(serializer.errors)
                    return Response(
                        {serializer.errors}, status=status.HTTP_400_BAD_REQUEST
                    )

        except Exception as e:
            print(str(e))
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        tags=["Password change and withdrawal"], responses={200: "Success"}
    )
    # Delete member
    def delete(self, request):
        try:
            user = request.user
            user.delete()
            return Response(
                {"message": "I deleted my account."}, status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            print(e)
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ChangeUserProfile(APIView):
    def patch(self, request):
        user = get_object_or_404(UserModel, id=request.user.id)
        image = request.data.get("profile_image")
        data = request.data.copy()

        if image == "undefined" or not image:
            data["profile_image"] = None
        user.profile_image = resize_image(data["profile_image"])
        user.save()
        return Response(
            {
                "message": "Modifications completed!",
                "image": user.profile_image.url if user.profile_image else False,
            },
            status=status.HTTP_200_OK,
        )


class CheckToken(APIView):

    def post(self, request):
        try:
            token = request.data.get("token")
            # token decode
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            # Check expiration time
            expiration_time = decoded_token.get("exp")
            return Response({"result": "success"}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError:
            # If the token has expired
            return Response({"result": "fail"}, status=status.HTTP_200_OK)
        except jwt.InvalidTokenError:
            # In case of invalid token
            return Response({"result": "fail"}, status=status.HTTP_200_OK)


def resize_image(image_data, output_size=(800, 600), quality=85):
    """
    Adjust the resolution of the image file and save it in JPEG format.
    :param image_data: Original image data (base64 encoded string).
    :param output_size: Size (width, height) of the image to be changed.
    :param quality: JPEG storage quality (1-100).
    :return: Changed image data (base64 encoded string).
    """
    try:
        # Convert image data to PIL image object
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))

        # Change image size
        image = image.resize(output_size, Image.ANTIALIAS)

        # Save in JPEG format
        output_buffer = io.BytesIO()
        image.save(output_buffer, format="JPEG", quality=quality)
        output_data = base64.b64encode(output_buffer.getvalue()).decode()
        print(634)
        return output_data
    except Exception as e:
        print(e)
        return image_data


class UserListView(generics.ListAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Example: Require authentication


class UserDetailsView(generics.RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Example: Require authentication
    lookup_field = "id"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

