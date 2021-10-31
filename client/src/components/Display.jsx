import useStore from "../store/store";

export default function Display() {
  const output = useStore((state) => state.output);
  const currentOutput = useStore((state) => state.currentOutput);

  return (
    <div className="display">
      <span>{output.join(" ")} </span>
      <span className="current">{currentOutput}</span>
      <span className="pointer">|</span>
    </div>
  );
}
