import { BsFillPinAngleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

export function StationPreview({ station, isCollapsed, index, moveStation }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  const { _id, imgUrl, name, songs } = station;

  const [{ isDragging }, drag] = useDrag({
    type: 'STATION',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'STATION',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveStation(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className="station-preview flex flex-row"
      onClick={() => navigate(`/station/${_id}`)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={imgUrl} alt="station img" />
      {!isCollapsed && (
        <div className="flex flex-column">
          <h3>{name}</h3>
          <div className="station-details flex flex-row">
            <span>Playlist</span>
            <span className="divider">&#9679;</span>
            <span>{songs?.length} songs</span>
          </div>
        </div>
      )}
    </li>
  );
}
