/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as Base64 from "../../utils/base64";
import * as ReqBuilder from "../../l0/index/l0-index-req-builder";

describe("L0-Index Tests", function () {
  const b64Block =
    "/QABooDXDp3lYYobm46rNaUu5U9acSPxDiR1ds4K6nBucp321Jq9i4y2XEuUQ1ykI2SkyX5XC3gZCEdnd7YZTZ0WXi/LQbZD4xEzTuPUSXrv6MMSKS9oaHBh0T4e954d24uzsk+lEUvUelUKscEBRRCYqOPJ6TCIYKOINAD8//yYennxFEnF/BZPnyq2SWHtFpDhlT4IvoQGTGa6QG4t1WXcm59a9RYbE+vAoXS+NrH/824HV42OKh3b2NMlU0rqmABklvDahLlnrTV7H1haFfRNiF4PZtwfqREHkRaSzAoSkg3Unzk7CoqTv4ncyFZhHsLXkySff7P39eTs9cYYfxnJvP27AgEBBGQbtw4BACCXZzW0yBHl2ojxNu1Y4xnvQntbqJLsWjtiN8OQ+f8VzwEB/YwCAQIgqYy6HoPTLSj+9gw3v9bMBLgwgnZtECEDlFDy8kjASU4EZBu3DgD9AAE4roXM7s26+hNkoKapvZkqliEgANXp2xPe++X47Gu0hRlH8AQKoW8uRLGXWPa30Rbgt79z63ck+9beDJKAcUbZVTrqsbjJyghyMijY2pjyB7WQJAunjZvp5t5CyXQk5CtK0F8ZUffJKqKgX8OU/jI18tVqc9msQ3lvJS7Q8ATI9Re3KQcl5/Slu33Vta//yQl6zIfOaMoKlIJe3ZiBTAUVXzUHoJy4efaY2EOGuNjwLJVA4p3UOHCS8fi3VPO4BYkf5ptEYpFeXOacBItwscTxEZQRG8XR27ctMbpATcTQIKAVNpbXpdnIfamPpw1B52Ksn/LDgA+iif4rIA9m/B9l/QABHW9Bck4aKzMTepIGhY1g/aNae6HOyHd3DkwqLOzeHSNG2rzBPuTC0XZApnnPm2ds+3FICuFEKK4JS2cC3rz0P4apt7wIYsQfB0CqWw/DN2E7iyJDZ+qbFWeKHe/AE1OqIlr0+gQfi5skLDYQZ6M2wwUESktV2qjrwlLWfVMZFlIe3sKld8gjb8UncN8ZzYvuPTB+hbB29O53lzm5NKc82F2Mt1dMuJD8kIWPI8IsuCIFKYONVUgFsHzlZ1UDxjKqBRBXB3l//CAhUvM6xc6Wb3+5kuEtxkFiRTruAceZ+woNVgyW6r7mX6Hueocd8oIu7LkeKZ549+iq74eGJkSNGFwBAiwyWGFVdFdiU2NQTDZncHc0QlVRWWFaRE9FMnIrNUh4djlNOUlIM3hqZlAwPRhjb20ubXl0aWtpLnNkay1kYXJ0LnRlc3QAElsiY3VzdG9tOnRlc3RpbmciXQ==";
  const storageKey =
    "2ab3efdb-8e91-4148-a43b-a7c198b4d3d7/qYy6HoPTLSj-9gw3v9bMBLgwgnZtECEDlFDy8kjASU4/icRGgJR1lZ__JU2UyS7kMHHf6DkrP1pC8TlR76pLIAs.block";
  const storageVer = "1234";

  const raw =
    "/QABXls2NTisiN4L/WatCwSBgdLJzy7Z0xF0IuyfT4VPo/cafXOdJGFCQruzpalO+QKNJoVOLt4SowvvsXTIeXTAO2xxiMJG5TEr1yUDodawd3sqzhD1Ske3k6aOHaeDnRZsCQocQr0jP9/8eTmusEmNRRkw1oIVvaEJseXgFbRk3iZ+8l9Iu/JO2lT84pHDlVZsP/Do/t/7jqk9o3/eOXNEhOhqNEWe6f/CgjwGnJHqELtqptRUQYjT7zsfVpIEqKBLsPtqVJlEWlRrqY5dEqLA/kdX6rnbadvz6on5HzUOTQWZRaN7jEWHW6gunhRTb9lV8xPcGCNjg7ie5BhHf176cP0kAgEBBGQNUt0gXO99p1jVEfpQoSnGnLy42h0NXgoDXJ428CaEI9p9ZtYg1CQMYKYtO9Bt2DnexUWNL3gSvs6kPKIxY84gYovUJM4BAf3WAQECIBWlDIObZIZPPfCoHFsCujFWwgImGhPr/6odLScEq7uSBGQNUt0xdHhuOi8vNFFsSUh3TVpZamNGdjVabU9Sc1R4WHlaTE9PZm1pU1VVYjVNZ0NqZHJVRf0AAUDusvurofCiXOLvtQAFjkuJrq9haVG+DMtZmA7BtznbeDovnyGcSTvzKmfQzQuv2NRXOvxZ2q4dOP+/uRypq/tbE/g/GkMhZ5uNS6Kd0wbR+LX7BWUhzf6zvmyeSAkcK3aicIQWm1vSt+X+MfK1ptdaASRQzQjVXfktQzbeAlZRPw0SO+hZ2tSU0atHaBvEz7d2OBVuV++2gfoWWcG2TnAwntr2FMbwmU9ny2BDpI0d0JHvv4gq11EjgzyfK5B1QNa4H9okWFaTfR9yl+kQE+CHEnTzmZbFqxe8oVw6ZSai0B6kY1ujmQUoN7P90yeHpG5K7sYWceyroFoburBQHvUAdwEDRFt7InVzZWNhc2VzIjpbImN1c3RvbTp0ZXN0aW5nIl0sImRlc3RpbmF0aW9ucyI6WyJcXC5teXRpa2lcXC5jb20iXX1dGGZvciB1c2UgaW4gdGVzdGluZyBvbmx5LhFyZWdpc3RyeSB0ZXN0aW5nLgRkDqRd";

  test("toReq Success", async () => {
    const blockBytes = Base64.decode(raw);
    const fetchReq = ReqBuilder.toReq(
      "dummy",
      storageKey,
      blockBytes,
      storageVer
    );
    // expect(blockBytes.length).toBe(1);
  });
});
