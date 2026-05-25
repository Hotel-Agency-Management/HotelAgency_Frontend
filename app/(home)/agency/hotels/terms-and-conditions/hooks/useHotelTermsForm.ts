"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HOTEL_TERMS_STATUSES } from "../constants/status";
import { createHotelTermsSchema, type HotelTermsFormValues } from "../schema/hotelTermsSchema";
import type { HotelTermsAndConditions } from "../types/terms";

export const getHotelTermsDefaultValues = (
  terms?: HotelTermsAndConditions | null
): HotelTermsFormValues => ({
  title: terms?.title ?? "",
  content: terms?.content ?? "",
  status: terms?.status ?? HOTEL_TERMS_STATUSES.DRAFT,});

export function useHotelTermsForm(terms?: HotelTermsAndConditions | null) {
  const { t } = useTranslation();
  const schema = useMemo(() => createHotelTermsSchema(t), [t]);

  const form = useForm<HotelTermsFormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: getHotelTermsDefaultValues(terms),
  });

  useEffect(() => {
    form.reset(getHotelTermsDefaultValues(terms));
  }, [form, terms]);

  return form;
}
