"use client";
import {
    getSocialAuthUrl
} from "@/lib/auth-api";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub, FaGoogle, FaSlack, FaXTwitter, FaYahoo } from "react-icons/fa6";
import { FaBehance, FaDribbble, FaInstagram } from "react-icons/fa";


type SocialAuthOption = {
    id: string;
    label?: string;
    ariaLabel?: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClassName?: string;
    labelClassName?: string;
};
function SocialAuthButton({
  option,
  className,
  onClick,
}: {
  option: SocialAuthOption;
  className: string;
  onClick: (option: SocialAuthOption) => void;
}) {
  const Icon = option.icon;

  return (
    <button
      aria-label={option.ariaLabel}
      className={`${className} ${option.iconClassName}`}
      onClick={() => onClick(option)}
      title={option.ariaLabel}
      type="button"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
function startSocialAuth(option: SocialAuthOption) {
    window.location.assign(getSocialAuthUrl(option.path));
}

export default function SocialAccount() {
    const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
    const socialAuthOptions: SocialAuthOption[] = [
        {
            id: "google",
            ariaLabel: "Continue with Google",
            path: "/accounts/google/login/",
            icon: FcGoogle,

        },
        {
            id: "x",
            label: "X",
            ariaLabel: "Continue with X",
            path: "/accounts/twitter_oauth2/login/",
            icon: FaXTwitter,
            iconClassName: "bg-[#f4f4f4] text-[#4d4d4d]",
            labelClassName: "font-medium",
        },
        {
            id: "linkedin",
            label: "in",
            ariaLabel: "Continue with LinkedIn",
            path: "/accounts/oidc/linkedin/login/",
            icon: FaLinkedinIn,
            iconClassName: "bg-[#e3ebff] text-[#0a66c2]",
            labelClassName: "text-[13px]",
        },
        {
            id: "github",
            label: "GH",
            ariaLabel: "Continue with GitHub",
            path: "/accounts/github/login/",
            icon: FaGithub,
            iconClassName: "bg-[#d3d3d3] text-white",
            labelClassName: "text-[13px]",
        },
        {
            id: "indeed",
            label: "i",
            ariaLabel: "Continue with Indeed",
            path: "/accounts/indeed/login/",
            icon: FaGithub,
            iconClassName: "bg-[#eefaff] text-[#2164f3]",
        },
        {
            id: "behance",
            label: "Be",
            ariaLabel: "Continue with Behance",
            path: "/accounts/behance/login/",
            icon: FaBehance,
            iconClassName: "bg-[#eaf1ff] text-[#1769ff]",
            labelClassName: "text-[13px]",
        },
        {
            id: "dribbble",
            label: "Dr",
            ariaLabel: "Continue with Dribbble",
            path: "/accounts/dribbble/login/",
            icon: FaDribbble,
            iconClassName: "bg-[#ffeaf3] text-[#ea4c89]",
            labelClassName: "text-[13px]",
        },
        {
            id: "upwork",
            label: "Up",
            ariaLabel: "Continue with Yahoo",
            path: "/accounts/yahoo/login/",
            icon: FaYahoo,
            iconClassName: "bg-[#edffe8] text-[#14a800]",
            labelClassName: "text-[13px]",
        },
        {
            id: "instagram",
            label: "IG",
            ariaLabel: "Continue with Instagram",
            path: "/accounts/instagram/login/",
            icon: FaInstagram,
            iconClassName: "bg-[#ffe9f4] text-[#c13584]",
            labelClassName: "text-[13px]",
        },
        {
            id: "slack",
            label: "S",
            ariaLabel: "Continue with Slack",
            path: "/accounts/slack/login/",
            icon: FaSlack,
            iconClassName: "bg-[#e6f4f1] text-[#36c55c]",
            labelClassName: "text-[13px]",
        }
    ];
    const primarySocialOptions = socialAuthOptions.slice(0, 3);
    return (
        <>
            <div className="flex items-center justify-center gap-4">
                {primarySocialOptions.map((option) => (
                    <SocialAuthButton
                        className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-[0_3px_8px_rgba(38,23,53,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_12px_rgba(38,23,53,0.18)] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10"
                        key={option.id}
                        onClick={startSocialAuth}
                        option={option}
                    />
                ))}
                <button
                    aria-expanded={isSocialMenuOpen}
                    aria-haspopup="dialog"
                    aria-label="More sign-up options"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#6d6079] shadow-[0_3px_8px_rgba(38,23,53,0.16)] transition hover:-translate-y-0.5 hover:text-[#6a00c2] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10"
                    onClick={() => setIsSocialMenuOpen(true)}
                    type="button"
                >
                    ...
                </button>
            </div>

            {isSocialMenuOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1620]/60 p-4"
                    onClick={() => setIsSocialMenuOpen(false)}
                >
                    <div
                        aria-labelledby="social-signup-title"
                        aria-modal="true"
                        className="relative w-full max-w-[465px] rounded-2xl bg-white px-8 pb-14 pt-12 shadow-[0_26px_60px_rgba(26,18,48,0.25)] sm:px-12"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                    >
                        <button
                            aria-label="Close sign-up options"
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-2xl font-bold leading-none text-[#9222e6] transition hover:bg-[#f7ebff] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10"
                            onClick={() => setIsSocialMenuOpen(false)}
                            type="button"
                        >
                            x
                        </button>
                        <h2
                            className="text-center text-[25px] font-bold leading-tight text-[#6a00c2]"
                            id="social-signup-title"
                        >
                            Join using your account
                        </h2>
                        <div className="mx-auto mt-14 grid max-w-[300px] grid-cols-3 justify-items-center gap-x-10 gap-y-11">
                            {socialAuthOptions.map((option) => (
                                <SocialAuthButton
                                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full text-base font-bold shadow-[0_5px_12px_rgba(38,23,53,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_9px_18px_rgba(38,23,53,0.18)] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10"
                                    key={option.id}
                                    onClick={startSocialAuth}
                                    option={option}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )

}