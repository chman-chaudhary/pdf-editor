"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { PageMetadata } from "@/types";
import PDFPagePreview from "./PagePreview";

interface Props {
  pages: PageMetadata[];
  setPages: (pages: PageMetadata[]) => void;
}

const PageList: React.FC<Props> = ({ pages, setPages }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedPages = Array.from(pages);
    const [movedPage] = updatedPages.splice(result.source.index, 1);
    updatedPages.splice(result.destination.index, 0, movedPage);

    setPages(updatedPages);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="pageList"
        direction="horizontal"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided) => (
          <div
            className="flex flex-wrap gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {pages.map((pageMeta, index) => (
              <Draggable
                key={`page-${index}`}
                draggableId={`page-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="p-2 border rounded bg-white"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PDFPagePreview pageMeta={pageMeta} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PageList;
