import { Link, Navigate, replace, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { createCheckoutSession, logout, onboard } from "../../../Api";
import logo from "../../../img/icon.png"
import PricingCards from "../../../components/PricingCards";
import pricing from "../../../pricing";
import BIcon from "../../../components/BIcon";

export default function OnboardingPage({ }) {
  const { user, isGuestUser, isFreeUser, refreshUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const loading = useMemo(() => !user?.verified, [user])
  const [message, setMessage] = useState(null)

  const requestOnboard = async e => {
    await onboard({})
    await refreshUser()
  }

  useEffect(() => {
    if (isGuestUser) {
      navigate("/login", { replace: true })
    }
    else if (user && user.onboarded) {
      navigate("/app", { replace: true })
    }
    else if (user && user.verified) {
      // requestOnboard()
    }
  }, [user])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (user) {
        if (!user.verified) {
          refreshUser()
        } else {
          clearInterval(intervalId)
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!user) return <></>

  const handleLogout = async () => {
    await logout()
    window.location.href = "/"
  }

  const { tiers } = pricing

  const handleTierSelected = async (tier) => {
    const res = await createCheckoutSession(tier)
    window.location.href = res.url;
  }

  return (
    <>
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Link to={"/"} className="absolute top-8 text-xl me-1 text-primary hover:text-primary-light">&larr; Try for Free</Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto h-10 w-auto"
          />
          <h1 className="text-3xl mb-2 font-bold tracking-tight text-gray-900">
            You're Almost Ready! 🎉
          </h1>
          <p className="text-gray-700">
            To get the most out of Transfer.zip, choose the plan that suits you. You can send files immediately upon purchase.
          </p>
        </div>
        <p className="text-primary text-center text-sm mt-4">
          <BIcon name={"patch-check-fill"} className={"text-xs"} /> If you're not completely satisfied within 7 days, we'll refund your full payment.
        </p>
        <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-12 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          <PricingCards tiers={tiers} compact={true} buttonText={"Subscribe"} onTierSelected={handleTierSelected} />
        </div>
        <p className="text-xs text-center mt-12 text-gray-500">
          Payments are handled through our secure payment provider Stripe. <Link className="text-primary-dark" target="_blank" to={"/legal/terms-and-conditions"}>Terms</Link> and <Link className="text-primary-dark" target="_blank" to={"/legal/privacy-policy"}>Privacy</Link> apply.
        </p>
        <div className="mt-1 text-xs">
          <p className="text-center text-gray-500">
            {/* Got regrets?{' '} */}
            You are logged in as {user?.email}{" "}
            <Link onClick={handleLogout} className="font-semibold text-primary-dark text-nowrap">
              <BIcon name={"box-arrow-left"} className={"me-1"} />
              Log out
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}