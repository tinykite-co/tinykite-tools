export default function Dropzone() {
  return (
    <label className="dropzone">
      <input type="file" className="dropzone-input" />
      <span>Drop files or click to browse</span>
    </label>
  );
}
