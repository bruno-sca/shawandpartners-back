export function getPaginationFromObject(
  obj: Record<string, unknown>
): PaginationOptions {
  return {
    page: obj.page ? Number(obj.page) : 0,
    pageSize: obj.pageSize ? Number(obj.pageSize) : 10,
  };
}

export function convertPagination(pagination: PaginationOptions) {
  return {
    pageStart: pagination.page * pagination.pageSize,
    pageSize: pagination.pageSize,
  };
}

export function getConvertedPaginationFromObject(obj: Record<string, unknown>) {
  return convertPagination(getPaginationFromObject(obj));
}
