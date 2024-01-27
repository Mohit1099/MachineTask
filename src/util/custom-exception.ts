import i18n from "i18n";
import { HttpException } from "@util/http-exception";
import constant from "@config/constant";

export class CustomException {
  public static general(error: string): HttpException {
    console.error(error, "CustomException.general");
    return new HttpException(
      constant.HTTP_STATUS_INTERNAL_ERROR,
      i18n.__("ERR10001"),
      "ERR10001"
    );
  }
}
