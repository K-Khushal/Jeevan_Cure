import {PrismaClient} from "@prisma/client";
import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {admin, bearer, multiSession, twoFactor, username} from "better-auth/plugins";
import {resend} from "./email/resend";
import {reactResetPasswordEmail} from "./email/rest-password";

const from = process.env.BETTER_AUTH_EMAIL || "send@thehustlers.dev";
const to = process.env.TEST_EMAIL || "";

const database = new PrismaClient();

const twoFactorPlugin = twoFactor({
	otpOptions: {
		async sendOTP(user, otp) {
			await resend.emails.send({
				from,
				to: user.email,
				subject: "Your OTP",
				html: `Your OTP is ${otp}`,
			});
		},
	},
});

export const auth = betterAuth({
  database: prismaAdapter(database, {
  		provider: "postgresql",
  	}),
	emailVerification: {
		async sendVerificationEmail(user, url) {
			console.log("Sending verification email to", user.email);
			const res = await resend.emails.send({
				from,
				to: user.email,
				subject: "Verify your email address",
				html: `<a href="${url}">Verify your email address</a>`,
			});
			console.log(res, user.email);
		},
		sendOnSignUp: true,
	},
	account: {
		enabled: true,
		accountLinking: {
			trustedProviders: ["google", "github"],
		},
	},
	emailAndPassword: {
		enabled: true,
		async sendResetPassword(user, url) {
			await resend.emails.send({
				from,
				to: user.email,
				subject: "Reset your password",
				react: reactResetPasswordEmail({
					username: user.email,
					resetLink: url,
				}),
			});
		},
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			// accessType: "offline",
			// prompt: "select_account",
		},
	},
	plugins: [
		twoFactorPlugin,
		bearer(),
		admin(),
		multiSession(),
		username(),
	],
});
