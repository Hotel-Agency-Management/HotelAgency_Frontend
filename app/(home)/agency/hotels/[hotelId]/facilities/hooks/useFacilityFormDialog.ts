import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultFacilityFormValues } from "../constants/facilityFormValues";
import { facilitySchema, type FacilityFormValues } from "../schema/facilitySchema";
import type { FacilityPhoto, HotelFacility } from "../types/facility";
import {
  useCreateFacility,
  useCreateAdminFacility,
  useUpdateFacility,
  useUpdateAdminFacility,
} from "./mutations/facilityMutations";
import { useFacilityScope } from "./useFacilityScope";
import { toNumericId } from "../utils/numericId";

interface Args {
  open: boolean;
  onClose: () => void;
  facility: HotelFacility | null;
  facilityId?: string | null;
  hotelId: string;
  agencyId?: string;
}

function toFormValues(facility: HotelFacility): FacilityFormValues {
  return {
    name: facility.name,
    facilityType: facility.facilityType,
    description: facility.description,
    status: facility.status,
    openAt: facility.openAt,
    closeAt: facility.closeAt,
  };
}

export function useFacilityFormDialog({
  open,
  onClose,
  facility,
  facilityId,
  hotelId,
  agencyId,
}: Args) {
  const isEdit = !!facility || !!facilityId;
  const [activeStep, setActiveStep] = useState(0);
  const [workingFacilityId, setWorkingFacilityId] = useState<string | null>(null);
  const [flowPhotos, setFlowPhotos] = useState<FacilityPhoto[]>([]);
  const scope = useFacilityScope(hotelId, agencyId);

  const methods = useForm<FacilityFormValues>({
    resolver: zodResolver(facilitySchema),
    defaultValues: defaultFacilityFormValues,
  });

  const { reset, handleSubmit } = methods;

  const { mutate: createFacility, isPending: isCreating } = useCreateFacility();
  const { mutate: updateFacility, isPending: isUpdating } = useUpdateFacility();
  const { mutate: createAdminFacility, isPending: isCreatingAdmin } =
    useCreateAdminFacility();
  const { mutate: updateAdminFacility, isPending: isUpdatingAdmin } =
    useUpdateAdminFacility();

  const stepLabels = useMemo(() => ["Main information", "Facility photos"], []);
  const isSavingPhotos = false;
  const busy =
    isCreating ||
    isUpdating ||
    isCreatingAdmin ||
    isUpdatingAdmin ||
    isSavingPhotos;

  const resetWizardState = useCallback(() => {
    setActiveStep(0);
    setWorkingFacilityId(null);
    setFlowPhotos([]);
  }, []);

  const resetAllAndClose = useCallback(() => {
    reset(defaultFacilityFormValues);
    resetWizardState();
  }, [reset, resetWizardState]);

  useEffect(() => {
    if (!open) return;

    if (facility) {
      reset(toFormValues(facility));
      setWorkingFacilityId(facility.id);
      setFlowPhotos(facility.photos);
    } else if (facilityId) {
      reset(defaultFacilityFormValues);
      setActiveStep(0);
      setWorkingFacilityId(facilityId);
      setFlowPhotos([]);
    } else {
      reset(defaultFacilityFormValues);
      resetWizardState();
    }
  }, [facility, facilityId, open, reset, resetWizardState]);

  const handleClose = () => {
    if (busy) return;
    onClose();
    resetAllAndClose();
  };

  const handleDetailsNext = handleSubmit((values) => {
    const hotelIdNumber = scope.hotelId;

    if (facility || workingFacilityId) {
      const facilityIdNumber = toNumericId(facility?.id ?? workingFacilityId);
      if (!facilityIdNumber) return;

      if (scope.type === "admin") {
        updateAdminFacility(
          {
            agencyId: scope.agencyId,
            hotelId: hotelIdNumber,
            facilityId: facilityIdNumber,
            data: values,
          },
          {
            onSuccess: (updatedFacility) => {
              setWorkingFacilityId(String(updatedFacility.id));
              setActiveStep(1);
            },
          }
        );
        return;
      }

      updateFacility(
        {
          hotelId: hotelIdNumber,
          facilityId: facilityIdNumber,
          data: values,
        },
        {
          onSuccess: (updatedFacility) => {
            setWorkingFacilityId(String(updatedFacility.id));
            setActiveStep(1);
          },
        }
      );
      return;
    }

    if (scope.type === "admin") {
      createAdminFacility(
        { agencyId: scope.agencyId, hotelId: hotelIdNumber, data: values },
        {
          onSuccess: (createdFacility) => {
            setWorkingFacilityId(String(createdFacility.id));
            setFlowPhotos([]);
            setActiveStep(1);
          },
        }
      );
      return;
    }

    createFacility(
      { hotelId: hotelIdNumber, data: values },
      {
        onSuccess: (createdFacility) => {
          setWorkingFacilityId(String(createdFacility.id));
          setFlowPhotos([]);
          setActiveStep(1);
        },
      }
    );
  });

  const handleFinish = () => {
    if (!workingFacilityId) return;

    onClose();
    resetAllAndClose();
  };

  return {
    methods,
    isEdit,
    facility,
    activeStep,
    stepLabels,
    workingFacilityId,
    flowPhotos,
    setFlowPhotos,
    setActiveStep,
    busy,
    isCreating: isCreating || isCreatingAdmin,
    isUpdating: isUpdating || isUpdatingAdmin,
    isSavingPhotos,
    handleClose,
    handleDetailsNext,
    handleFinish,
  };
}
