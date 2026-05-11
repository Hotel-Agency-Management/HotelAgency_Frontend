"use client";

import { useState } from "react";
import { useHotelTermsEditor } from "./useHotelTermsEditor";
import { useHotelTermsForm } from "./useHotelTermsForm";
import { useAdminHotelTermsList, useHotelTermsList } from "./useHotelTermsQueries";
import { useTermsScope } from "./useTermsScope";

export function useHotelTermsSettingsView(hotelId: string) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const scope = useTermsScope();

  const ownerQuery = useHotelTermsList(
    scope.type === "hotel" ? Number(hotelId) : undefined
  );
  const adminQuery = useAdminHotelTermsList(
    scope.type === "admin" ? scope.agencyId : undefined,
    scope.type === "admin" ? Number(hotelId) : undefined,
  );

  const { data: termsList, isLoading, error } = scope.type === "admin" ? adminQuery : ownerQuery;

  const resolvedTerms = termsList?.[0] ?? null;
  const form = useHotelTermsForm(resolvedTerms);
  const { isEditing, isSaving, handleEdit, handleCancel, handleSave } = useHotelTermsEditor({
    form,
    terms: resolvedTerms,
  });

  const handleOpenDeleteDialog = () => {
    if (!resolvedTerms) return;
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleDelete = async () => {
    setIsDeleteDialogOpen(false);
  };

  return {
    termsList,
    resolvedTerms,
    isLoading,
    error,
    form,
    isEditing,
    isSaving,
    isDeleteDialogOpen,
    handleEdit,
    handleCancel,
    handleSave,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleDelete,
  };
}
