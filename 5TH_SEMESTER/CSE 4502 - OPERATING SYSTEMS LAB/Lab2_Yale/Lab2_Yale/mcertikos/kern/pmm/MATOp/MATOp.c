#include <lib/debug.h>
#include "import.h"

#define PAGESIZE 4096
#define VM_USERLO 0x40000000
#define VM_USERHI 0xF0000000
#define VM_USERLO_PI (VM_USERLO / PAGESIZE)
#define VM_USERHI_PI (VM_USERHI / PAGESIZE)

unsigned int next = VM_USERLO_PI;

/**
 * Allocate a physical page.
 *
 * 1. First, implement a naive page allocator that scans the allocation table (AT)
 *    using the functions defined in import.h to find the first unallocated page
 *    with normal permissions.
 *    (Q: Do you have to scan the allocation table from index 0? Recall how you have
 *    initialized the table in pmem_init.)
 *    Then mark the page as allocated in the allocation table and return the page
 *    index of the page found. In the case when there is no available page found,
 *    return 0.
 * 2. Optimize the code using memoization so that you do not have to
 *    scan the allocation table from scratch every time.
 */

// // naive
// unsigned int palloc()
// {
//   // no available physical pages
//   if (get_nps() == 0)
//   {
//     return 0;
//   }

//   // Naive approach: scan from the beginning every time
//   for (unsigned int i = VM_USERLO_PI; i < VM_USERHI_PI; i++)
//   {
//     if (at_is_norm(i) && at_is_allocated(i) == 0)
//     {
//       at_set_allocated(i, 1);
//       return i;
//     }
//   }

//   // No available page found
//   return 0;
// }

unsigned int palloc()
{
    // TODO - DONE
    // no available physical pages
    if (get_nps() == 0)
    {
        return 0;
    }

    // memoization
    // first record the current value of next
    unsigned int start = next;
    do
    {
        // if the page pointed by next has the usable permission and it's not allocated
        // then allocate the page, and return the page index
        if (at_is_norm(next) && at_is_allocated(next) == 0)
        {
            at_set_allocated(next, 1);
            return next;
        }
        next++;
        // if next moves to the end, we set next to the beginning
        if (next == VM_USERHI_PI)
        {
            next = VM_USERLO_PI;
        }
    } while (next != start);

    // all pages are allocated
    return 0;
}

/**
 * Free a physical page.
 *
 * This function marks the page with given index as unallocated
 * in the allocation table.
 *
 * Hint: Simple.
 */
void pfree(unsigned int pfree_index)
{
    // TODO - DONE
    at_set_allocated(pfree_index, 0); // from MATIntro.c
}

// -_- N4M154 -_-