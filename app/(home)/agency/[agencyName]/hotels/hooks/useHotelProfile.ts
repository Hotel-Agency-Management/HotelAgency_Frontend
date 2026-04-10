"use client";

import { useEffect, useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { HotelFormValues } from "../types/hotel";

interface UseHotelProfileOptions {
  defaultValues: HotelFormValues;
  onSave: (data: HotelFormValues) => Promise<void> | void;
}

interface UseHotelProfileReturn {
  isEditing: boolean;
  isSaving: boolean;
  form: UseFormReturn<HotelFormValues>;
  handleEdit: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

export function useHotelProfile({
  defaultValues,
  onSave,
}: UseHotelProfileOptions): UseHotelProfileReturn {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<HotelFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const { reset } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  const handleSave = form.handleSubmit(async (data) => {
    setIsSaving(true);
    try {
      await onSave(data);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  });

  return {
    isEditing,
    isSaving,
    form,
    handleEdit,
    handleSave,
    handleCancel,
  };
}
