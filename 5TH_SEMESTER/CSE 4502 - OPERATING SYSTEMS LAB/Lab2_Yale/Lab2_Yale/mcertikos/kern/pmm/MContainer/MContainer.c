// containers are used to isolate processes and manage resources.
// The container model ensures that each process has a defined
// memory quota, usage, parent-child relationships, and status.

#include <lib/debug.h>
#include <lib/x86.h>
#include "import.h"
#define NUM_IDS 64     // from /lib/x86.h
#define MAX_CHILDREN 3 // from /lib/x86.h

struct SContainer
{
    int quota; // the maximum number of pages that ID i is allowed to use
    // the current memory usage of the process
    int usage;     // the number of pages that ID i has currently allocated for itself or distributed to children
    int parent;    // the ID of the parent of i (or 0 if i = 0)
    int nchildren; // the number of child processes of i
    int used;      // a boolean saying whether or not ID i is in use
};

// mCertiKOS supports up to NUM_IDS processes
static struct SContainer CONTAINER[NUM_IDS];

/**
 * Initializes the container data for the root process (the one with index 0).
 * The root process is the one that gets spawned first by the kernel.
 */
void container_init(unsigned int mbi_addr)
{
    unsigned int real_quota; // number of available memory pages (or physical memory units) that the root process (process 0) can use.

    // TODO: define your local variables here.
    unsigned int nps;
    unsigned int i;

    pmem_init(mbi_addr);
    real_quota = 0;

    /**
     * TODO: Compute the available quota and store it into the variable real_quota.
     * It should be the number of the unallocated pages with the normal permission
     * in the physical memory allocation table.
     */
    nps = get_nps();          // from MATIntro.c
    for (i = 0; i < nps; i++) // loop through all the pages
    {
        if (at_is_norm(i) && !at_is_allocated(i)) // if the page has normal perm and is unallocated
        {
            real_quota++; // only then the root process can use that page.
        }
    }
    KERN_DEBUG("\nreal quota: %d\n\n", real_quota);

    CONTAINER[0].quota = real_quota; // root process has this amount of pages
    CONTAINER[0].usage = 0;          // but still hasn't used any
    CONTAINER[0].parent = 0;         // has no parent,is the root
    CONTAINER[0].nchildren = 0;      // no children yet
    CONTAINER[0].used = 1;           // is in use
}

// Get the id of parent process of process # [id].
unsigned int container_get_parent(unsigned int id)
{
    // TODO
    return CONTAINER[id].parent;
}

// Get the number of children of process # [id].
unsigned int container_get_nchildren(unsigned int id)
{
    // TODO
    return CONTAINER[id].nchildren;
}

// Get the maximum memory quota of process # [id].
unsigned int container_get_quota(unsigned int id)
{
    // TODO
    return CONTAINER[id].quota;
}

// Get the current memory usage of process # [id].
unsigned int container_get_usage(unsigned int id)
{
    // TODO
    return CONTAINER[id].usage;
}

// Determines whether the process # [id] can consume an extra
// [n] pages of memory. If so, returns 1, otherwise, returns 0.
unsigned int container_can_consume(unsigned int id, unsigned int n)
{
    // TODO
    if (CONTAINER[id].quota - CONTAINER[id].usage >= n) // if max - current > total pages
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

/**
 * Dedicates [quota] pages of memory for a new child process.
 * You can assume it is safe to allocate [quota] pages
 * (the check is already done outside before calling this function).
 * Returns the container index for the new child process.
 */
unsigned int container_split(unsigned int id, unsigned int quota) // id of the parent and the quota for the child
{
    unsigned int child, nc;

    nc = CONTAINER[id].nchildren;       // parent currently has this many children
    child = id * MAX_CHILDREN + 1 + nc; // container index for the child process.Ensures each child process has a unique container index.

    if (NUM_IDS <= child)
    // This checks if the calculated child index exceeds the maximum number of allowed containers (NUM_IDS).
    // If so, the function returns NUM_IDS to indicate failure, meaning no more processes can be created.
    {
        return NUM_IDS;
    }

    /**
     * TODO: Update the container structure of both parent and child process appropriately.
     */

    // update parent
    CONTAINER[id].nchildren++;    // has one more child
    CONTAINER[id].usage += quota; // has an extra quota amount of pages

    // update child
    CONTAINER[child].quota = quota;
    CONTAINER[child].usage = 0;
    CONTAINER[child].parent = id;
    CONTAINER[child].nchildren = 0;
    CONTAINER[child].used = 1; // is in use
    return child;              // creates only one child every time it's called
}

/**
 * Allocates one more page for process # [id], given that this will not exceed the quota.
 * The container structure should be updated accordingly after the allocation.
 * Returns the page index of the allocated page, or 0 in the case of failure.
 */
unsigned int container_alloc(unsigned int id) // id of the process to be allocated a page
{
    /*
     * TODO: Implement the function here.
     */
    unsigned int pid; // stores the page index (ID) of the newly allocated page. If the allocation fails, pid will be 0.

    pid = palloc(); // from MATOp.c
    if (pid == 0)
        return 0; // If palloc() returned 0, this means the allocation failed (likely because there are no free pages available).

    CONTAINER[id].usage++; // If the allocation succeeds (pid is not 0), the usage field of the process's container (with ID id) is incremented by 1.Has one more page
    return pid;
    // process actually needs to allocate a page not just increment buy doing container[id].usage++
}

// Frees the physical page and reduces the usage by 1.
void container_free(unsigned int id, unsigned int page_index)
// id: The ID of the process whose memory is being freed.
// page_index: The index of the physical page that is being freed.
{
    // TODO
    pfree(page_index); // from MATOp.c
    CONTAINER[id].usage--;
}
// -_-N4M154-_-