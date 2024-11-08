import Logo from "@/components/Logo";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-4 justify-center h-screen">
      <Logo />
      {children}
    </div>
  );
};

export default layout;
