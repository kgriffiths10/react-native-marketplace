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
  CarFront, 
  CircleEllipsis, 
  Dumbbell, 
  Heater, 
  House, 
  MonitorSmartphone, 
  NotebookText, 
  Route, 
  Shirt, 
  Sofa,
  MapPinned,
  Heart,
  ListPlus,
  MessageCircleMore,
  Settings,
  Store,
  MapPin,
  Dot,
  CircleX,
  ArrowBigUpDash,
  SquarePen
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

const icons = [
  AlertCircle, CheckCircle, XCircle, EllipsisVertical, Minus, Pin, Plus, PlusIcon, Scroll, Search, Settings2, Zap,
  Rocket, Info, CarFront, CircleEllipsis, Dumbbell, Heater, House, MonitorSmartphone, NotebookText, Route, Shirt, Sofa,
  MapPinned, Heart, ListPlus, MessageCircleMore, Settings, Store, MapPin, Dot, CircleX, ArrowBigUpDash, SquarePen
];

icons.forEach(interopIcon);

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
  CarFront, 
  CircleEllipsis, 
  Dumbbell, 
  Heater, 
  House, 
  MonitorSmartphone, 
  NotebookText, 
  Route, 
  Shirt, 
  Sofa,
  MapPinned,
  Heart,
  ListPlus,
  MessageCircleMore,
  Settings,
  Store,
  MapPin,
  Dot,
  CircleX,
  ArrowBigUpDash,
  SquarePen,

};