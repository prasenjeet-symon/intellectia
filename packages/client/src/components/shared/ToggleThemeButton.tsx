import { useTheme } from "@/hooks/useTheme";
import { Button } from "../ui/button";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      ToggleTheme
    </Button>
  );
};

export default ToggleThemeButton;
