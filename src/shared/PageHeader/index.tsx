export type IPageHeaderProps = {
  title: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  //   breadCrumb?: IBreadCrumbItem[];
};

export default function PageHeader({
  title,
  icon,

  actions,
  children,
}: IPageHeaderProps) {
  //   const navigate = useNavigate();
  return (
    <>
      <header className="sticky top-0 bg-white z-20">
        <div className="grid gap-2 border-b-[1px] border-[#CBD5E1] px-8 py-5">
          {/* {breadCrumb && (
            <nav className="">
              <ol className="flex pl-0 list-reset">
                {breadCrumb.map((item, index) => (
                  <li key={item.text} className="flex items-center">
                    <p
                      className={`after:content-['/'] after:no-underline after:mx-[3px] text-[12px] ${
                        index === breadCrumb.length - 1
                          ? "text-[#0000FF]  after:hidden"
                          : "text-[#0F172A] cursor-pointer hover:underline "
                      }`}
                      onClick={() => {
                        if (item.href) {
                          navigate(item?.href);
                        }
                      }}
                    >
                      {item?.text}
                    </p>
                  </li>
                ))}
              </ol>
            </nav>
          )} */}
          <div className="items-center grid justify-between gap-3 grid-flow-col">
            <div className="grid grid-flow-col items-center gap-3">
              {icon && icon}
              <p className="text-[#0F172A] text-[24px] font-[400]">{title}</p>
            </div>

            {actions && (
              <div className="grid grid-flow-col gap-3 bg-[#0e6ce0] text-[#fff] px-4 py-2 rounded-md cursor-pointer border shadow-md">
                {actions}
              </div>
            )}
          </div>
        </div>
        {children}
      </header>
    </>
  );
}
