"use client";

import getBrandColours from "@bookph/core/lib/getBrandColours";
import useTheme from "@bookph/core/lib/hooks/useTheme";
import useMeQuery from "@bookph/core/trpc/react/hooks/useMeQuery";
import { useCalcomTheme } from "@bookph/ui/styles";

export const useAppTheme = () => {
  const { data: user } = useMeQuery();
  const brandTheme = getBrandColours({
    lightVal: user?.brandColor,
    darkVal: user?.darkBrandColor,
  });
  useCalcomTheme(brandTheme);
  useTheme(user?.appTheme);
};
