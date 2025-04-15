const GridCard = ({ key, title, label }: any) => {
    return (
      <div key={key}>
        <p className="text-gray-500 text-sm  dark:text-white/70  trackibng-wider">
          {label}
        </p>
        <p className="text-gray-500 text-base  dark:text-white font-medium trackibng-wider">
          {title}
        </p>
      </div>
    );
};
  
export default GridCard