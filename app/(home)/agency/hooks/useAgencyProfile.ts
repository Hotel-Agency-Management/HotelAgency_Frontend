"use client";

import { useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { AgencyProfile } from "../types/agencyProfile";

interface UseAgencyProfileReturn {
  isEditing: boolean;
  isLoading: boolean;
  form: UseFormReturn<AgencyProfile>;
  handleEdit: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

interface UseAgencyProfileOptions {
  defaultValues: AgencyProfile;
  onSave: (data: AgencyProfile) => Promise<void> | void;
}

export function useAgencyProfile({
  defaultValues,
  onSave,
}: UseAgencyProfileOptions): UseAgencyProfileReturn {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AgencyProfile>({
    defaultValues,
    mode: "onBlur",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset(defaultValues);
    setIsEditing(false);
  };

  const handleSave = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await onSave(data);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  });

  return {
    isEditing,
    isLoading,
    form,
    handleEdit,
    handleSave,
    handleCancel,
  };
}
