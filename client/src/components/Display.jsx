import useStore from "../store/store";

export default function Display() {
  const output = useStore((state) => state.output);

  return (
    <div className="display">
      <span>{output.join(" ")} </span>
    </div>
  );
}
