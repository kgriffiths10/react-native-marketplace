import { TouchableOpacityProps, TextInputProps } from "react-native";


declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: React.ElementType; // Change to React.ElementType to accept any component
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  required?: boolean;
}
declare interface ScrollSelectProps extends TextInputProps {
  label: string;
  options: string[];
  selectedValues: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  required?: boolean;
}

declare interface PriceFieldProps extends InputFieldProps {
  currency: string;
}