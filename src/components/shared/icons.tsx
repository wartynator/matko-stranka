import {
  BuildingsIcon,
  CertificateIcon,
  ClipboardTextIcon,
  ClockIcon,
  FactoryIcon,
  HardHatIcon,
  LeafIcon,
  PlugIcon,
  ShieldCheckIcon,
  SirenIcon,
  TimerIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";
import type { ComponentType } from "react";

type IconProps = { size?: number; weight?: "light" | "regular"; className?: string };

/** Icon family: Phosphor only. Standard weight across the project is "light". */
export const ICONS: Record<string, ComponentType<IconProps>> = {
  shield: ShieldCheckIcon,
  buildings: BuildingsIcon,
  clock: ClockIcon,
  hardhat: HardHatIcon,
  certificate: CertificateIcon,
  timer: TimerIcon,
  plug: PlugIcon,
  factory: FactoryIcon,
  wrench: WrenchIcon,
  siren: SirenIcon,
  clipboard: ClipboardTextIcon,
  leaf: LeafIcon,
};

export function Icon({
  name,
  size = 26,
  className,
}: Readonly<{
  name: string;
  size?: number;
  className?: string;
}>) {
  const Cmp = ICONS[name] ?? ShieldCheckIcon;
  return <Cmp size={size} weight="light" className={className} />;
}
