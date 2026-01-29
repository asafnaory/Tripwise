"use client";

import { locationInfo } from "@/app/actions/trip-actions"
import { Button } from "@/components/ui/button"
import { ArrowUpRightIcon } from "lucide-react"
import { z } from "zod";


type MoreInfoButtonProps = {
  onClick: () => void
}
export function MoreInfoButton({ onClick }: MoreInfoButtonProps) {

  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="lg" aria-label="Submit" variant="outline" onClick={ onClick }>
          More info
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
}
