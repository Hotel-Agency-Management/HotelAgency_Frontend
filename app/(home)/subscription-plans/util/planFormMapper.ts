import { SubscriptionPlan } from "../configs/planConfig"
import { PlanFormState, PlanFormValues } from "../types/plans"
import { makeEmptyForm } from "./plans"

export const makeEmptyFormState = (): PlanFormState => ({
  ...makeEmptyForm(),
  price: '',
})

export const makeInitialFormState = (initial: SubscriptionPlan): PlanFormState => ({
  name: initial.name,
  description: initial.description,
  price: initial.price,
  status: initial.status,
  planFeatures: initial.planFeatures,
})

export const toSubmitValues = (values: PlanFormState): PlanFormValues => ({
  ...values,
  price: Number(values.price),
})
