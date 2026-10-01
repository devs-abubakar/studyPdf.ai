import React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";


const ScrollToBottom = ({ onClick }) => {
  return (
    <div className="mb-2 w-full flex justify-center">
      <Button
        onClick={onClick}
        size={"icon"}
      >
        <ArrowDown />
      </Button>
    </div>
  );
};

export default ScrollToBottom;