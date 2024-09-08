function getLocStore(item) {
  return localStorage.getItem(item);
}
if (
  !getLocStore("uid") ||
  !getLocStore("accessToken") ||
  !getLocStore("email")
) {
  location.replace("../../login");
}
