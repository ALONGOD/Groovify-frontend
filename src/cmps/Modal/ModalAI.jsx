export function ModalAI({
  setUserPrompt,
  setShowAIModal,
  userPrompt,
  onAddAIPlaylist,
}) {
  return (
    <div className="ai-modal-backdrop">
      <div className="ai-modal">
        <h2>AI Playlist Generator</h2>
        <input
          type="text"
          value={userPrompt}
          onChange={e => setUserPrompt(e.target.value)}
          placeholder="Enter genre or mood"
        />
        <div className="btns flex flex-row justify-center">
          <button onClick={onAddAIPlaylist}>Generate Playlist</button>
          <button onClick={() => setShowAIModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
