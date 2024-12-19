import { 
  AlertCircle, 
  CheckCircle, 
  LucideIcon, 
  XCircle,
  EllipsisVertical, 
  Minus, 
  Pin, 
  Plus, 
  PlusIcon, 
  Scroll, 
  Search, 
  Settings2, 
  Zap,
  Rocket,
  Info,
 } from 'lucide-react-native';
import { cssInterop } from 'nativewind';


function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon(AlertCircle);
interopIcon(CheckCircle);
interopIcon(XCircle);
interopIcon(EllipsisVertical);
interopIcon(Minus);
interopIcon(Pin);
interopIcon(Plus);
interopIcon(PlusIcon);
interopIcon(Scroll);
interopIcon(Search);
interopIcon(Settings2);
interopIcon(Zap);
interopIcon(Rocket);
interopIcon(Info);

export { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  EllipsisVertical, 
  Minus, 
  Pin, 
  Plus, 
  PlusIcon, 
  Scroll, 
  Search, 
  Settings2, 
  Zap,
  Rocket, 
  Info,
};