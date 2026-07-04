export default function ManifestoSection() {
  return (
    <div className="c-manifesto">
      <div className="c-manifestoInner">
        {["Learn Together", "Build Together", "Lead Together", "Grow Together", "Celebrate Together"].map((text) => (
          <div key={text} className="c-manifestoItem">
            <span className="c-manifestoDot" />
            <span className="c-manifestoText">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}