import { useSelector } from "react-redux";
import { removeSongFromStation, toggleModal } from "../store/actions/station.actions";
import { SongPreview } from "./StationDetails/SongPreview";

export function SongList({ songs }) {
    const songModal = useSelector(state => state.stationModule.modalSong)

    function onToggleModal(event, song) {
        event.stopPropagation();
        toggleModal(song)
      }

      

  return songs.map((song, idx) => {
    return (
      <SongPreview
        key={song.id}
        song={song}
        idx={idx}
        songModal={songModal}
        onToggleModal={onToggleModal}
      />
    )
  })
}
