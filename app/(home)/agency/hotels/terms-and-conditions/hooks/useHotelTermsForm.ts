"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HOTEL_TERMS_STATUSES } from "../constants/status";
import { hotelTermsSchema, type HotelTermsFormValues } from "../schema/hotelTermsSchema";
import type { HotelTermsAndConditions } from "../types/terms";

export const getHotelTermsDefaultValues = (
  terms?: HotelTermsAndConditions | null
): HotelTermsFormValues => ({
  title: terms?.title ?? "",
  content: terms?.content ?? "",
  status: terms?.status ?? HOTEL_TERMS_STATUSES.DRAFT,
});

export function useHotelTermsForm(terms?: HotelTermsAndConditions | null) {
  const form = useForm<HotelTermsFormValues>({
    resolver: zodResolver(hotelTermsSchema),
    mode: "onChange",
    defaultValues: getHotelTermsDefaultValues(terms),
  });

  useEffect(() => {
    form.reset(getHotelTermsDefaultValues(terms));
  }, [form, terms]);

  return form;
}
