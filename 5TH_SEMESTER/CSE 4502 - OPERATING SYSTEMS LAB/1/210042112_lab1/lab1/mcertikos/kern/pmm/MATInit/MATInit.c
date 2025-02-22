#include <lib/debug.h>
#include "import.h"

#define PAGESIZE 4096
#define VM_USERLO 0x40000000
#define VM_USERHI 0xF0000000
#define VM_USERLO_PI (VM_USERLO / PAGESIZE)
#define VM_USERHI_PI (VM_USERHI / PAGESIZE)

/**
 * The initialization function for the allocation table AT.
 * It contains two major parts:
 * 1. Calculate the actual physical memory of the machine, and sets the number
 *    of physical pages (NUM_PAGES).
 * 2. Initializes the physical allocation table (AT) implemented in the MATIntro layer
 *    based on the information available in the physical memory map table.
 *    Review import.h in the current directory for the list of available
 *    getter and setter functions.
 */
void pmem_init(unsigned int mbi_addr)
{

  // TODO: Define your local variables here. - DONE

  unsigned int nps;

  unsigned int table;
  unsigned int start_addrs;
  unsigned int length;
  unsigned int end_addrs;
  unsigned int page_start;
  unsigned int page_end;
  unsigned int perm;
  unsigned int i;
  unsigned int j;

  // Calls the lower layer initialization primitive.
  // The parameter mbi_addr should not be used in the further code.
  devinit(mbi_addr);

  /**
   * Calculate the total number of physical pages provided by the hardware and
   * store it into the local variable nps.
   * Hint: Think of it as the highest address in the ranges of the memory map table,
   *       divided by the page size.
   */
  // TODO - DONE

  table = get_size(); // number of rows in the table
  if (table == 0)     // no memory region available
  {
    nps = 0; // no page available
  }
  else
  {

    start_addrs = get_mms(table - 1); // start address of the last row.Because the last row has the most memory.
    length = get_mml(table - 1);      // lengt of the last row
    end_addrs = start_addrs + length - 1;
    nps = (end_addrs + 1) / PAGESIZE; // to account for zero-based indexing.This gives the number of 4KB pages that can fit into the physical memory up to end_addrs.
  }

  set_nps(nps); // Setting the value computed above to NUM_PAGES.

  /**
   * Initialization of the physical allocation table (AT).
   *
   * In CertiKOS, all addresses < VM_USERLO or >= VM_USERHI are reserved by the kernel.
   * That corresponds to the physical pages from 0 to VM_USERLO_PI - 1,
   * and from VM_USERHI_PI to NUM_PAGES - 1.
   * The rest of the pages that correspond to addresses [VM_USERLO, VM_USERHI)
   * can be used freely ONLY IF the entire page falls into one of the ranges in
   * the memory map table with the permission marked as usable.
   *
   * Hint:
   * 1. You have to initialize AT for all the page indices from 0 to NPS - 1.
   * 2. For the pages that are reserved by the kernel, simply set its permission to 1.
   *    Recall that the setter at_set_perm also marks the page as unallocated.
   *    Thus, you don't have to call another function to set the allocation flag.
   * 3. For the rest of the pages, explore the memory map table to set its permission
   *    accordingly. The permission should be set to 2 only if there is a range
   *    containing the entire page that is marked as available in the memory map table.
   *    Otherwise, it should be set to 0. Note that the ranges in the memory map are
   *    not aligned by pages, so it may be possible that for some pages, only some of
   *    the addresses are in a usable range. Currently, we do not utilize partial pages,
   *    so in that case, you should consider those pages as unavailable.
   */
  // TODO - DONE

  // Initialize the physical allocation table (AT).
  for (i = 0; i < nps; i++)
  {
    // If the page falls in the kernel-reserved range, mark it with permission 1.
    if (i < VM_USERLO_PI || i >= VM_USERHI_PI)
    {
      at_set_perm(i, 1);
    }
    else
    {
      // Check if the page falls entirely within a usable memory range.
      perm = 0; // Assume the page is unusable (default).

      for (j = 0; j < table; j++)
      {
        start_addrs = get_mms(j);
        length = get_mml(j);
        end_addrs = start_addrs + length - 1;

        // Check if the entire page falls within this memory range and is marked as usable.
        if (is_usable(j))
        { // Check if this range is marked as usable.
          page_start = i * PAGESIZE;
          page_end = page_start + PAGESIZE - 1;

          if (page_start >= start_addrs && page_end < end_addrs)
          {
            perm = 2; // Mark the page as usable.
            break;
          }
        }
      }

      at_set_perm(i, perm); // Set permission
    }
  }
}

// -_- N4M154 -_-