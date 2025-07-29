'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { Button } from '@/src/components/ui/button'

interface TablePaginationProps {
  page: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  onPageChange: (page: number) => void
  size: number
  onSizeChange: (size: number) => void
}

export function TablePagination({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
  size,
  onSizeChange,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      {/* Dropdown de tamanho por página */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Itens por página:</span>
        <Select
          value={String(size)}
          onValueChange={(value) => onSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[100px] h-8 text-sm">
            <SelectValue placeholder={`${size} por página`} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50, 100].map((option) => (
              <SelectItem
                key={option}
                value={String(option)}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Botões de paginação */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
        >
          Anterior
        </Button>

        <span className="text-sm text-muted-foreground">
          Página <strong>{page}</strong> de <strong>{totalPages}</strong>
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
