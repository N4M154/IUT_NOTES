#include <lib/debug.h>
#include <pmm/MATIntro/export.h>
#include "export.h"

#define PAGESIZE 4096
#define VM_USERLO 0x40000000
#define VM_USERHI 0xF0000000
#define VM_USERLO_PI (VM_USERLO / PAGESIZE)
#define VM_USERHI_PI (VM_USERHI / PAGESIZE)

int MATOp_test1()
{
    int page_index = palloc();
    if (page_index < VM_USERLO_PI || VM_USERHI_PI <= page_index)
    {
        dprintf("test 1.1 failed: (%d < VM_USERLO_PI || VM_USERHI_PI <= %d)\n", page_index, page_index);
        pfree(page_index);
        return 1;
    }
    if (at_is_norm(page_index) != 1)
    {
        dprintf("test 1.2 failed: (%d != 1)\n", at_is_norm(page_index));
        pfree(page_index);
        return 1;
    }
    if (at_is_allocated(page_index) != 1)
    {
        dprintf("test 1.3 failed: (%d != 1)\n", at_is_allocated(page_index));
        pfree(page_index);
        return 1;
    }
    pfree(page_index);
    if (at_is_allocated(page_index) != 0)
    {
        dprintf("test 1.4 failed: (%d != 0)\n", at_is_allocated(page_index));
        return 1;
    }
    dprintf("test 1 passed.\n");
    return 0;
}

/**
 * Write Your Own Test Script (optional)
 *
 * Come up with your own interesting test cases to challenge your classmates!
 * In addition to the provided simple tests, selected (correct and interesting) test functions
 * will be used in the actual grading of the lab!
 * Your test function itself will not be graded. So don't be afraid of submitting a wrong script.
 *
 * The test function should return 0 for passing the test and a non-zero code for failing the test.
 * Be extra careful to make sure that if you overwrite some of the kernel data, they are set back to
 * the original value. O.w., it may make the future test scripts to fail even if you implement all
 * the functions correctly.
 */
int MATOp_test_own()
{
    // TODO (optional) - DONE

    int i;
    int nps = get_nps(); // Get the number of physical pages

    for (i = 0; i < 10; i++)
    {
        unsigned int page_index = palloc(); // Allocate a page
        if (page_index == 0)
        {
            dprintf("Test failed: palloc returned 0, no pages available\n");
            return 2; // Fail
        }
        if (at_is_allocated(page_index) != 1)
        {
            dprintf("Test failed at page %d: Page should be allocated but is not\n", page_index);
            return 2; // Fail
        }
    }

    for (i = 0; i < 10; i++)
    {
        unsigned int page_index = i; // Assume the first 10 pages were allocated in Test 2
        pfree(page_index);           // Free the page
        if (at_is_allocated(page_index) != 0)
        {
            dprintf("Test ailed at page %d: Page should be unallocated but is still allocated\n", page_index);
            return 3; // Fail
        }
    }

    dprintf("Own test passed.\n");
    return 0; // Success
}

int test_MATOp()
{
    return MATOp_test1() + MATOp_test_own();
}
// -_- N4M154 -_-