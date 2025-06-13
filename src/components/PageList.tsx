"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import PDFPagePreview from "./PagePreview";
import { usePDFContext } from "@/context/PDFContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PageList = () => {
  const { pages, setPages, handleDeletePage } = usePDFContext();
  const router = useRouter();

  useEffect(() => {
    if (pages.length === 0) router.push("/");
  }, [pages.length, router]);

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
            className="flex flex-wrap gap-4 p-8"
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
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PDFPagePreview
                      pageMeta={pageMeta}
                      onDelete={handleDeletePage}
                    />
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
