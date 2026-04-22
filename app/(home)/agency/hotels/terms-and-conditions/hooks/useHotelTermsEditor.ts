"use client";

import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { HotelTermsAndConditions } from "../types/terms";
import type { HotelTermsFormValues } from "../schema/hotelTermsSchema";
import { getHotelTermsDefaultValues } from "./useHotelTermsForm";

interface UseHotelTermsEditorOptions {
  form: UseFormReturn<HotelTermsFormValues>;
  terms: HotelTermsAndConditions | null;
  onSave: (values: HotelTermsFormValues) => Promise<void>;
}

export function useHotelTermsEditor({
  form,
  terms,
  onSave,
}: UseHotelTermsEditorOptions) {
  const [isEditing, setIsEditing] = useState(!terms);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsEditing(!terms);
  }, [terms]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset(getHotelTermsDefaultValues(terms));
    setIsEditing(false);
  };

  const handleSave = form.handleSubmit(async values => {
    setIsSaving(true);

    try {
      await onSave(values);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  });

  return {
    isEditing,
    isSaving,
    handleEdit,
    handleCancel,
    handleSave,
  };
}
