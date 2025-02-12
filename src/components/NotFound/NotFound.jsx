import img from "../../assets/error.svg";
export default function NotFound() {
  return (
    <header className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img src={img} className="w-full mx-auto" alt="Not found" />
    </header>
  );
}
