"use client";

import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { HotelTermsFormValues } from "../schema/hotelTermsSchema";
import type { TermsResponse } from "../types/terms";
import { getHotelTermsDefaultValues } from "./useHotelTermsForm";
import { useHotelTermsSave } from "./useHotelTermsSave";
import { useTermsScope } from "./useTermsScope";

interface UseHotelTermsEditorOptions {
  form: UseFormReturn<HotelTermsFormValues>;
  terms?: TermsResponse | null;
}

export function useHotelTermsEditor({ form, terms }: UseHotelTermsEditorOptions) {
  const [isEditing, setIsEditing] = useState(!terms);
  const [isSaving, setIsSaving] = useState(false);

  const scope = useTermsScope();
  const save = useHotelTermsSave(scope, terms ?? null);

  useEffect(() => {
    setIsEditing(!terms);
  }, [terms]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    form.reset(getHotelTermsDefaultValues(terms));
    setIsEditing(false);
  };

  const handleSave = form.handleSubmit(async (values) => {
    setIsSaving(true);
    try {
      await save(values);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  });

  return { isEditing, isSaving, handleEdit, handleCancel, handleSave };
}
