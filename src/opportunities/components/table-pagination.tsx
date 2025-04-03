import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { memo, useMemo } from 'react';

interface Props {
  page: number;
  onChange(page: number): void;
  pages: number;
  totalPages?: number;
  uncountableLabel?: boolean;
}

export const TablePagination = memo(
  ({ pages, page, onChange, uncountableLabel }: Props) => {
    const formattedPages = useMemo(() => {
      let pageItems = [];

      if (pages > 1) {
        if (page > pages) {
          return;
        }
        const placesToStart = page - 1;
        const placesToEnd = pages - page;

        let spacesBehind = 2;
        let spacesAhead = 4;

        let needStartEllipsis = false;
        let needEndEllipsis = false;

        if (placesToStart - spacesBehind > 0) {
          needStartEllipsis = true;
        } else if (placesToStart - spacesBehind <= 0) {
          spacesBehind = placesToStart;
          spacesAhead += spacesBehind - placesToStart;
        }

        if (placesToEnd - spacesAhead <= 0) {
          spacesAhead = placesToEnd;
        }

        if (placesToEnd - spacesAhead > 0) {
          needEndEllipsis = true;
        }
        if (needStartEllipsis) {
          spacesBehind -= 1;
        }
        if (needEndEllipsis) {
          spacesAhead -= 1;
        }

        if (needStartEllipsis && needEndEllipsis) {
          pageItems.push('...');
          for (let i = page - spacesBehind; i <= page + spacesAhead; i += 1) {
            pageItems.push(i);
          }
          pageItems.push('...');
        } else if (needStartEllipsis && !needEndEllipsis) {
          pageItems.push('...');
          for (let i = page - spacesBehind; i <= page + spacesAhead; i += 1) {
            pageItems.push(i);
          }
        } else if (!needStartEllipsis && needEndEllipsis) {
          for (let i = page - spacesBehind; i <= page + spacesAhead; i += 1) {
            pageItems.push(i);
          }
          pageItems.push('...');
        } else if (!needStartEllipsis && !needEndEllipsis) {
          for (let i = page - spacesBehind; i <= page + spacesAhead; i += 1) {
            pageItems.push(i);
          }
        }
      } else {
        pageItems = [1];
      }
      return pageItems;
    }, [page, pages]);

    if (pages === 0) return null;

    return (
      <div className="flex items-center gap-1">
        {!uncountableLabel && (
          <p className="whitespace-nowrap mr-2 text-slate-600">
            Total {String(pages).padStart(2, '0')} pag.
          </p>
        )}
        <Pagination>
          <PaginationContent>
            {pages !== 3 && page > 3 && (
              <PaginationItem onClick={() => onChange(1)}>
                <PaginationLink href="#" size="sm">
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {page > 1 && (
              <PaginationItem
                onClick={() => {
                  !(page === 1) && onChange(page - 1);
                }}
              >
                <PaginationPrevious href="#" size="sm" />
              </PaginationItem>
            )}
            {formattedPages?.map((formattedPage, index) => {
              if (formattedPage === '...') {
                return (
                  <PaginationItem key={`${formattedPage}-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem
                  key={formattedPage}
                  onClick={() => onChange(Number(formattedPage))}
                >
                  <PaginationLink
                    isActive={page === formattedPage}
                    href="#"
                    size="sm"
                  >
                    {formattedPage}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {(page < pages - 4 || page <= 1) && pages > 5 && (
              <>
                <PaginationItem
                  onClick={() => {
                    !(page === pages) && onChange(page + 1);
                  }}
                >
                  <PaginationNext href="#" size="sm" />
                </PaginationItem>
                <PaginationItem onClick={() => onChange(pages)}>
                  <PaginationLink href="#" size="sm">
                    {pages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
);
