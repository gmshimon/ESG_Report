import type { CreateESGInput } from "../lib/Feature/Emission/emission.types";
import {
  createESGRecord,
  fetchESGRecords,
} from "@/lib/Feature/Emission/emission.thunk";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";

const useEmission = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchESGRecords());
  }, [dispatch]);

  const createESGData = (data: CreateESGInput) => {
    dispatch(createESGRecord(data));
  };

  return {
    createESGData,
  };
};

export default useEmission;
