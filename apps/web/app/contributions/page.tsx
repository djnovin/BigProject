"use client"

import React, { useState } from "react"
import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toggle } from "@/components/ui/toggle"

const Step3 = ({
  formData,
  formErrors,
  handleFormChange,
  handleNext,
  handleBack,
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Step 3</CardTitle>
        <CardDescription>Fill out credit card information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cardholders-name">Cardholders Name</Label>
            <Input
              aria-label="Cardholders name"
              id="cardholders-name"
              type="text"
              name="cardholdersName"
              value={formData.firstName}
              onChange={handleFormChange}
              placeholder="Cardholders Name"
            />
            {formErrors.cardholdersName && (
              <p className="text-sm text-red-500">
                {formErrors.cardholdersName}
              </p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              aria-label="Card number"
              id="card-number"
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleFormChange}
              placeholder="Card Number"
            />
            {formErrors.cardNumber && (
              <p className="text-sm text-red-500">{formErrors.cardNumber}</p>
            )}
          </div>
          <div className="grid w-full max-w-sm grid-cols-2 items-center gap-1.5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input
                aria-label="Expiry date"
                id="expiry-date"
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleFormChange}
                placeholder="Expiry Date"
              />
              {formErrors.expiryDate && (
                <p className="text-sm text-red-500">{formErrors.expiryDate}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                aria-label="CVV"
                id="cvv"
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleFormChange}
                placeholder="CVV"
              />
              {formErrors.cvv && (
                <p className="text-sm text-red-500">{formErrors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <Button onClick={handleBack}>Go Back</Button>
          <Button onClick={handleNext}>Continue</Button>
        </div>
      </CardFooter>
    </>
  )
}

const Step1 = ({
  formData,
  formErrors,
  handleFormChange,
  handleNext,
  handleBack,
}) => {
  const handlePaymentMethodChange = (e) => {
    handleFormChange(e)

    const otherPaymentMethod =
      e.target.value === "creditCard" ? "bankTransfer" : "creditCard"
    handleFormChange({
      target: {
        name: "paymentMethod",
        value:
          formData.paymentMethod === otherPaymentMethod
            ? e.target.value
            : otherPaymentMethod,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 1</CardTitle>
        <CardDescription>Select a payment method to proceed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="credit-card">Immediate Contributions</Label>
          <Toggle
            variant="outline"
            id="credit-card"
            name="paymentMethod"
            value="creditCard"
            checked={formData.paymentMethod === "creditCard"}
            onChange={handlePaymentMethodChange}
          >
            <p className="text-sm text-gray-500">Credit Card</p>
          </Toggle>
          <Label htmlFor="bank-transfer">Scheduled Contributions</Label>
          <Toggle
            variant="outline"
            id="bank-transfer"
            name="paymentMethod"
            value="bankTransfer"
            checked={formData.paymentMethod === "bankTransfer"}
            onChange={handlePaymentMethodChange}
          >
            <p className="text-sm text-gray-500">Bank Transfer</p>
          </Toggle>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext}>Continue</Button>
      </CardFooter>
    </Card>
  )
}

const Step2 = ({
  formData,
  formErrors,
  handleFormChange,
  handleNext,
  handleBack,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2</CardTitle>
        <CardDescription>Set the amount you want to contribute</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="amount">Amount</Label>
            <Input
              aria-label="Amount"
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleFormChange}
              placeholder="Amount"
            />
            {formErrors.amount && (
              <p className="text-sm text-red-500">{formErrors.amount}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <Button onClick={handleBack}>Go Back</Button>
          <Button onClick={handleNext}>Continue</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const Step4 = ({
  formData,
  formErrors,
  handleFormChange,
  handleNext,
  handleBack,
  handleFormSubmit,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 4</CardTitle>
        <CardDescription>Please review your contribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="summary">Summary</Label>
          <p className="text-sm text-gray-500">
            Payment Method: {formData.paymentMethod}
          </p>
          <p className="text-sm text-gray-500">Amount: {formData.amount}</p>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox id="send-email" />
            <Label htmlFor="send-email">Send me a receipt via Email</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleBack}>Go Back</Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  )
}

const ThankYou = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thank You!</CardTitle>
        <CardDescription>Your contribution has been received</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>
          <Link href="/">Go To Home</Link>
        </Button>
        <Button>Go To Contributions</Button>
      </CardFooter>
    </Card>
  )
}

type CardProps = React.ComponentProps<typeof Card>

const ContributionForm = ({ className, ...props }: CardProps) => {
  const [step, setStep] = useState(1)

  type FormData = {
    cardholdersName: string
    cardNumber: string
    email: string
    phone: string
  }

  type FormErrors = {
    cardholdersName: string
    cardNumber: string
    email: string
    phone: string
  }

  const [formData, setFormData] = useState<FormData>({
    cardholdersName: "",
    cardNumber: "",
    email: "",
    phone: "",
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({
    cardholdersName: "",
    cardNumber: "",
    email: "",
    phone: "",
  })

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const errors = { ...formErrors }

    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/

    switch (name) {
      case "cardholdersName":
        errors.cardholdersName =
          value.length < 5 ? "Full name must be 5 characters long!" : ""
        break
      case "cardNumber":
        errors.cardNumber =
          value.length < 16 ? "Card number must be 16 characters long!" : ""
        break
      case "email":
        errors.email =
          value.length < 5 ? "Email must be 5 characters long!" : ""
        break
      case "phone":
        errors.phone =
          value.length < 10 ? "Phone number must be 10 characters long!" : ""
        break
      default:
        break
    }

    setFormErrors(errors)

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

    // if submitted successfully, send to last step thank you page
    setStep(5)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleFormChange={handleFormChange}
            handleNext={handleNext}
            formErrors={formErrors}
            handleBack={undefined}
          />
        )
      case 2:
        return (
          <Step2
            formData={formData}
            handleFormChange={handleFormChange}
            handleNext={handleNext}
            handleBack={handleBack}
            formErrors={formErrors}
          />
        )
      case 3:
        return (
          <Step3
            formData={formData}
            handleFormChange={handleFormChange}
            handleNext={handleNext}
            handleBack={handleBack}
            formErrors={formErrors}
          />
        )
      case 4:
        return (
          <Step4
            formData={formData}
            handleFormChange={handleFormChange}
            handleNext={handleNext}
            handleBack={handleBack}
            formErrors={formErrors}
            handleFormSubmit={undefined}
          />
        )
      case 5:
        return <ThankYou />

      default:
        return null
    }
  }

  return (
    <div className="">
      <Card className={cn("w-[380px] ", className)} {...props}>
        <form onSubmit={handleFormSubmit}>{renderStep()}</form>
      </Card>
    </div>
  )
}

const Contributions = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ContributionForm />
    </div>
  )
}

export default Contributions
