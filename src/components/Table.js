"use client";

import {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  reorderRows,
  addImageToCell,
} from "@/redux/slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imgArr } from "./img";

function Table() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [check, setCheck] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);
  const [show, setShow] = useState(false);
  const closeDialog = () => setShow(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(imgArr);

  const tableData = useSelector((s) => s.tableData.data);
  const variantNames = useSelector((state) => state.tableData.variantName);
  const msg = useSelector((state) => state.tableData.msg);
  console.log(msg);
  const dispatch = useDispatch();

  useEffect(() => {
    const results = imgArr.filter((img) =>
      extractFileName(img).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(results);
  }, [searchTerm]);

  useEffect(() => {
    if (msg && check) {
      toast.success(msg, {
        position: "top-center",
      });
      setCheck(false);
    }
  }, [msg, check]);

  const handleAddRow = () => {
    dispatch(addRow());
    setCheck(true);
  };
  const handleDeleteRow = (id) => {
    dispatch(deleteRow(id));
    setCheck(true);
  };

  const handleAddColumn = () => {
    dispatch(addColumn());
    setCheck(true);
  };

  const handleDeleteColumn = (index) => {
    dispatch(deleteColumn(index));
    setCheck(true);
  };

  const handleDesign = (id, ind, edit) => {
    console.log(id, ind);
    setRow(id);
    setCol(ind);
    setShow(true);
    setIsEdit(edit);
  };

  const extractFileName = (path) => {
    return path.split("/").pop().split(".")[0];
  };
  const shortenDesc = (desc, maxLength = 20) => {
    if (desc.length <= maxLength) return desc;
    return desc.slice(0, maxLength) + "...";
  };

  const handleDesignImg = (i) => {
    dispatch(
      addImageToCell({
        rowId: row,
        variantIndex: col,
        imagePath: i,
        name: extractFileName(i),
        isEdit: isEdit,
      })
    );
    setIsEdit(false);
    closeDialog();
    setCheck(true);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    dispatch(
      reorderRows({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  return (
    <>
      <div className="bg-gray-50 p-8 rounded-md border-gray-200 border-[1px]">
        <div className="overflow-scroll relative">
          <table className="">
            <thead>
              <tr className="text-gray-500 text-sm md:text-base">
                <th className="sticky left-0 z-10 bg-gray-50 w-[50px] min-w-[50px] lg:w-[70px] lg:min-w-[70px] border-r border-gray-200"></th>
                <th className="sticky left-[50px] lg:left-[70px] pl-6 z-10 w-[150px] min-w-[150px] md:w-[300px] md:min-w-[300px] lg:w-[500px] bg-gray-50 lg:min-w-[500px] border-r border-gray-200">
                  Product Filter
                </th>
                {variantNames.map((v, index) => (
                  <th
                    key={index}
                    className="w-[100px] md:w-[200px] border-r border-gray-200"
                    onMouseEnter={() => setHoveredCol(index)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    <div className="flex justify-between items-center px-4 m-0">
                      <p>{v}</p>
                      <div className="flex items-center">
                        <img
                          src="./trash.svg"
                          className={`${
                            hoveredCol === index && index >= 2
                              ? "visible"
                              : "invisible"
                          } cursor-pointer mr-2`}
                          onClick={() => handleDeleteColumn(index)}
                        ></img>
                        <img src="./option.svg" alt="options" className="" />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="table-rows">
                {(provided) => (
                  <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {tableData.map((s, index) => (
                      <Draggable key={s.id} draggableId={s.id} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`text-center ${
                              snapshot.isDragging ? "bg-gray-100" : ""
                            }`}
                            onMouseEnter={() => setHoveredRow(s.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            <td
                              className="sticky left-0 z-10 bg-gray-50 border-r border-gray-200 text-xl md:text-3xl font-bold"
                              {...provided.dragHandleProps}
                            >
                              <div className="flex flex-col items-center">
                                <img
                                  src="./trash.svg"
                                  alt="Delete"
                                  className={`${
                                    hoveredRow === s.id
                                      ? "visible"
                                      : "invisible"
                                  } cursor-pointer`}
                                  onClick={() => handleDeleteRow(s.id)}
                                ></img>
                                <div className="flex m-0 items-center justify-center">
                                  <p className="">{index + 1}</p>
                                  <img
                                    src="./drag.svg"
                                    className="-mt-3 w-4 md:w-6"
                                  ></img>
                                </div>
                              </div>
                            </td>
                            <td className="sticky z-10 bg-gray-50 lg:left-[70px] left-[50px] p-6 border-r border-gray-200">
                              <div className="bg-white border-dashed border-gray-200 border-[1px] px-6 py-4 h-48 rounded-md  flex items-center justify-center text-sm">
                                <div className="flex flex-wrap gap-2">
                                  {s.filters.length ? (
                                    s.filters.map((f, i) => (
                                      <span
                                        key={i}
                                        className={
                                          i % 2 === 0
                                            ? "border-[1px] border-gray-200 rounded-md py-[1px] md:py-[2px] px-2 md:px-3 text-xs md:text-sm lg:text-base"
                                            : "border-[1px] border-green-500 font-bold text-green-500 bg-green-100 rounded-md py-[1px] md:py-[2px] px-2 md:px-3 text-xs md:text-sm lg:text-base"
                                        }
                                      >
                                        {f}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="border-[1px] border-gray-200 p-1 rounded-md px-3">
                                      + Add Product Filters
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            {s.variants.map((v, vIndex) => (
                              <td
                                key={vIndex}
                                className="p-6 border-r border-gray-200 w-[100px] md:w-[200px]"
                              >
                                <div className="w-[100px] md:w-[200px] bg-white border-dashed border-gray-200 border-[1px] px-2 py-4 h-48 rounded-md flex flex-col items-center justify-center text-sm">
                                  {v.img ? (
                                    <div className="relative flex flex-col items-center">
                                      <div className="relative">
                                        <img
                                          src={v.img}
                                          className="max-w-[70px] md:max-w-[100px] h-[100px] md:h-[130px] w-auto object-contain"
                                          alt={`Variant ${vIndex + 1}`}
                                        />
                                        <div
                                          className={`${
                                            hoveredRow === s.id
                                              ? "visible"
                                              : "invisible"
                                          } cursor-pointer absolute inset-0 flex items-center justify-center`}
                                          onClick={() =>
                                            handleDesign(s.id, vIndex, true)
                                          }
                                        >
                                          <span className="bg-white p-2 rounded-md">
                                            <img
                                              src="./edit.svg"
                                              className="w-6"
                                            />
                                          </span>
                                        </div>
                                      </div>
                                      <p className="mt-2">
                                        {shortenDesc(v.desc)}
                                      </p>
                                    </div>
                                  ) : (
                                    <span
                                      className="border-[1px] border-gray-200 p-1 rounded-md px-3"
                                      onClick={() =>
                                        handleDesign(s.id, vIndex, false)
                                      }
                                    >
                                      + Add Design
                                    </span>
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="p-6 text-xl md:text-3xl">
                              <div className="flex m-0 items-center justify-center cursor-pointer">
                                <span
                                  className="bg-white p-[2px] md:p-1 px-2 md:px-3 rounded-md border-[1px] border-gray-200 flex items-center justify-center"
                                  onClick={() => handleAddColumn()}
                                >
                                  +
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </DragDropContext>
            <tr>
              <td className="sticky left-0 z-10 border-r border-gray-200 text-xl md:text-3xl">
                <div
                  className="cursor-pointer flex m-0 items-center justify-center"
                  onClick={handleAddRow}
                >
                  <span className="bg-white md:p-1 md:px-3 p-[2px] px-2 rounded-md border-[1px] border-gray-200 flex items-center justify-center">
                    +
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={closeDialog} size="lg" centered>
        <div className="min-h-[500px] max-h-[500px] flex flex-col">
          <Modal.Header>
            <Modal.Title className="w-full">
              <div className="flex justify-between items-center w-full">
                <p className="font-bold text-lg mt-3">
                  Select a design to link
                </p>
                <div className="relative">
                  <img
                    src="./search.svg"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    alt="Search"
                  />
                  <input
                    className="border-[1px] border-gray-200 rounded-md w-64 lg:w-96 pl-10 py-2 text-sm lg:text-base outline-none"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="overflow-y-auto flex-grow">
            <div className="flex flex-wrap gap-6 w-full">
              {filteredImages.length == 0 ? (
                <span>No Matches</span>
              ) : (
                filteredImages.map((i, ind) => (
                  <>
                    <div
                      key={ind}
                      className="w-[72px] sm:w-[132px] flex flex-col"
                      onMouseEnter={() => setHoveredImage(ind)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <div className="flex justify-center items-center min-h-[140px] sm:min-h-[250px] h-auto">
                        <img
                          src={i}
                          className="w-full h-full object-cover rounded-md"
                          alt={`Design ${ind + 1}`}
                        />
                        {hoveredImage === ind && (
                          <button
                            className="absolute m-auto p-2 bg-white rounded-md "
                            onClick={() => handleDesignImg(i)}
                          >
                            Insert
                          </button>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-center break-words">
                        {extractFileName(i)}
                      </p>
                    </div>
                  </>
                ))
              )}
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Table;
