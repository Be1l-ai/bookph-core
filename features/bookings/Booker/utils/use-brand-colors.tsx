import useGetBrandingColours from "@bookph/core/lib/getBrandColours";
import useTheme from "@bookph/core/lib/hooks/useTheme";
import { useCalcomTheme } from "@bookph/ui/styles";

export const useBrandColors = ({
  brandColor,
  darkBrandColor,
  theme,
}: {
  brandColor?: string;
  darkBrandColor?: string;
  theme?: string | null;
}) => {
  const brandTheme = useGetBrandingColours({
    lightVal: brandColor,
    darkVal: darkBrandColor,
  });

  useCalcomTheme(brandTheme);
  useTheme(theme);
};
