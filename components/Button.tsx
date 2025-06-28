interface ButtonProps {
  content: string | React.ReactElement,
  secondary?: boolean,
  type?: "button" | "reset" | "submit" | undefined,
  className?: string,
  onClick?: () => void,
  asDiv?: boolean, // New prop to control element type
}

const Button: React.FC<ButtonProps> = ({
  content,
  secondary,
  type,
  className,
  onClick,
  asDiv,
}) => {
  const Element = asDiv ? 'span' : 'button';

  return (
    <Element
      onClick={onClick}
      className={`
        ${secondary ? 'bg-transparent border-[0.5px] border-zinc-600' : 'bg-deeppurple text-white'}
        px-4 py-1 rounded-md w-full ${className}
      `}
      {...(!asDiv && { type })}
    >
      {content}
    </Element>
  );
};

export default Button;
