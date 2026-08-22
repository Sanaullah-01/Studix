# Studix Deployment Guide

This document outlines the exact steps required to deploy the Studix Next.js application to **Vercel** and configure the necessary third-party services (Supabase, Resend, and Google reCAPTCHA v3).

---

## 1. Vercel Deployment

Since Studix is built on Next.js App Router (with Turbopack), deploying to Vercel is a zero-configuration process.

1. Create a [Vercel](https://vercel.com/) account and connect your GitHub repository.
2. Select the `Studix` repository to deploy.
3. Vercel will automatically detect the Next.js framework. Leave the Build Command and Install Command as defaults.
4. **Before clicking Deploy**, add the Environment Variables listed below.

---

## 2. Environment Variables

You must populate the following environment variables in your Vercel Project Settings for the authentication, database, and security features to function in production.

### Supabase
*Found in your Supabase Dashboard -> Project Settings -> API*

- `NEXT_PUBLIC_SUPABASE_URL` : Your project URL (e.g., `https://xyz.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Your anon `public` API key.

### Google reCAPTCHA v3
*Found in your Google Cloud reCAPTCHA Enterprise Dashboard*

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` : The site key embedded in the frontend.
- `RECAPTCHA_SECRET_KEY` : The secret key used securely in the Server Actions.

### Resend (Emails)
*Found in your Resend Dashboard*

- `RESEND_API_KEY` : Your generated Resend API key.
- `RESEND_FROM_EMAIL` : The verified sender email (e.g., `onboarding@yourdomain.com`).

---

## 3. Post-Deployment Configuration

After Vercel successfully builds and deploys your site, you will receive a production URL (e.g., `https://Studix-xyz.vercel.app`).

### Configure Supabase Auth Redirects
Supabase needs to know your production URL so it can safely redirect users after authentication (like magic links, password resets, or MFA flows).

1. Go to your Supabase Dashboard.
2. Navigate to **Authentication** -> **URL Configuration**.
3. Under **Site URL**, paste your Vercel Production URL.
4. Under **Redirect URLs**, add `https://Studix-xyz.vercel.app/**` to whitelist all paths on your domain.

### Update reCAPTCHA Domains
Google reCAPTCHA restricts which domains can generate tokens.

1. Go to your Google reCAPTCHA admin console.
2. Under **Settings** for your site key, add your Vercel Production domain to the **Domains** list.

---

## 4. Current Architecture Notes

- **Database:** The application currently relies on a real Supabase `profiles` table for user settings and the `avatars` Storage Bucket for images. 
- **Mock Data:** The Courses and Assignments modules are currently operating on in-memory mock data (Phase 6 & 7 design choice) to ensure a smooth demo. When you are ready, these can be migrated to real Postgres tables using standard Supabase schemas.
- **MFA:** Multi-Factor Authentication is currently optional. Users can enroll by visiting `/mfa/enroll` while logged in. If they enroll, the system will automatically intercept future logins and route them to `/mfa/verify`.

