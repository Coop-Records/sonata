import { Icons } from './resolver';

export type IconsType = keyof typeof Icons;

interface IIcon {
  name: IconsType;
  className?: string;
}

const Icon = ({ name, className }: IIcon) => {
  const IconSVG = Icons[name];

  return <IconSVG className={className} />;
};

export default Icon;
