function R(e) {
  return (a, ...t) => Hs(e, a, t);
}
function Ee(e, a) {
  return R(
    Kt(
      e,
      a
    ).get
  );
}
const {
  apply: Hs,
  getOwnPropertyDescriptor: Kt,
  getPrototypeOf: Wa,
  ownKeys: $s
} = Reflect, {
  iterator: ea,
  toStringTag: Ks
} = Symbol, Xs = Object, {
  create: Ja,
  defineProperty: Ys
} = Xs, Ws = Array, Js = Ws.prototype, Xt = Js[ea], Qs = R(Xt), Yt = ArrayBuffer, Zs = Yt.prototype;
Ee(Zs, "byteLength");
const vt = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : null;
vt && Ee(vt.prototype, "byteLength");
const Wt = Wa(Uint8Array);
Wt.from;
const F = Wt.prototype;
F[ea];
R(F.keys);
R(
  F.values
);
R(
  F.entries
);
R(F.set);
R(
  F.reverse
);
R(F.fill);
R(
  F.copyWithin
);
R(F.sort);
R(F.slice);
R(
  F.subarray
);
Ee(
  F,
  "buffer"
);
Ee(
  F,
  "byteOffset"
);
Ee(
  F,
  "length"
);
Ee(
  F,
  Ks
);
const en = Uint8Array, Jt = Uint16Array, Qa = Uint32Array, an = Float32Array, $e = Wa([][ea]()), Qt = R($e.next), tn = R((function* () {
})().next), sn = Wa($e), nn = DataView.prototype, on = R(
  nn.getUint16
), Za = WeakMap, Zt = Za.prototype, es = R(Zt.get), dn = R(Zt.set), as = new Za(), cn = Ja(null, {
  next: {
    value: function() {
      const a = es(as, this);
      return Qt(a);
    }
  },
  [ea]: {
    value: function() {
      return this;
    }
  }
});
function rn(e) {
  if (e[ea] === Xt && $e.next === Qt)
    return e;
  const a = Ja(cn);
  return dn(as, a, Qs(e)), a;
}
const hn = new Za(), fn = Ja(sn, {
  next: {
    value: function() {
      const a = es(hn, this);
      return tn(a);
    },
    writable: !0,
    configurable: !0
  }
});
for (const e of $s($e))
  e !== "next" && Ys(fn, e, Kt($e, e));
const ts = new Yt(4), ln = new an(ts), mn = new Qa(ts), te = new Jt(512), se = new en(512);
for (let e = 0; e < 256; ++e) {
  const a = e - 127;
  a < -24 ? (te[e] = 0, te[e | 256] = 32768, se[e] = 24, se[e | 256] = 24) : a < -14 ? (te[e] = 1024 >> -a - 14, te[e | 256] = 1024 >> -a - 14 | 32768, se[e] = -a - 1, se[e | 256] = -a - 1) : a <= 15 ? (te[e] = a + 15 << 10, te[e | 256] = a + 15 << 10 | 32768, se[e] = 13, se[e | 256] = 13) : a < 128 ? (te[e] = 31744, te[e | 256] = 64512, se[e] = 24, se[e | 256] = 24) : (te[e] = 31744, te[e | 256] = 64512, se[e] = 13, se[e | 256] = 13);
}
const et = new Qa(2048);
for (let e = 1; e < 1024; ++e) {
  let a = e << 13, t = 0;
  for (; (a & 8388608) === 0; )
    a <<= 1, t -= 8388608;
  a &= -8388609, t += 947912704, et[e] = a | t;
}
for (let e = 1024; e < 2048; ++e)
  et[e] = 939524096 + (e - 1024 << 13);
const Ae = new Qa(64);
for (let e = 1; e < 31; ++e)
  Ae[e] = e << 23;
Ae[31] = 1199570944;
Ae[32] = 2147483648;
for (let e = 33; e < 63; ++e)
  Ae[e] = 2147483648 + (e - 32 << 23);
Ae[63] = 3347054592;
const ss = new Jt(64);
for (let e = 1; e < 64; ++e)
  e !== 32 && (ss[e] = 1024);
function un(e) {
  const a = e >> 10;
  return mn[0] = et[ss[a] + (e & 1023)] + Ae[a], ln[0];
}
function ns(e, a, ...t) {
  return un(
    on(e, a, ...rn(t))
  );
}
function xa(e, a, t) {
  const s = typeof e == "object" ? e.outer : e, n = s.slice(0, s.indexOf(">") + 1), i = ['"', "'"];
  for (let d = 0; d < i.length; d++) {
    const o = i[d], c = a + "\\=" + o + "([^" + o + "]*)" + o, l = new RegExp(c).exec(n);
    if (l) return l[1];
  }
}
function bn(e, a, t) {
  const n = new RegExp(a).exec(e.slice(t));
  return n ? t + n.index : -1;
}
function Ua(e, a, t) {
  const n = new RegExp(a).exec(e.slice(t));
  return n ? t + n.index + n[0].length - 1 : -1;
}
function gt(e, a) {
  const t = new RegExp(a, "g"), s = e.match(t);
  return s ? s.length : 0;
}
function wn(e, a, t) {
  const s = t && t.debug || !1, n = !(t && typeof t.nested === !1), i = t && t.startIndex || 0;
  s && console.log("[xml-utils] starting findTagByName with", a, " and ", t);
  const d = bn(e, `<${a}[ 
>/]`, i);
  if (s && console.log("[xml-utils] start:", d), d === -1) return;
  const o = e.slice(d + a.length);
  let c = Ua(o, "^[^<]*[ /]>", 0);
  const r = c !== -1 && o[c - 1] === "/";
  if (s && console.log("[xml-utils] selfClosing:", r), r === !1)
    if (n) {
      let u = 0, m = 1, b = 0;
      for (; (c = Ua(o, "[ /]" + a + ">", u)) !== -1; ) {
        const w = o.substring(u, c + 1);
        if (m += gt(w, "<" + a + `[ 
	>]`), b += gt(w, "</" + a + ">"), b >= m) break;
        u = c;
      }
    } else
      c = Ua(o, "[ /]" + a + ">", 0);
  const l = d + a.length + c + 1;
  if (s && console.log("[xml-utils] end:", l), l === -1) return;
  const f = e.slice(d, l);
  let h;
  return r ? h = null : h = f.slice(f.indexOf(">") + 1, f.lastIndexOf("<")), { inner: h, outer: f, start: d, end: l };
}
function zn(e, a, t) {
  const s = [];
  let i = 0, d;
  for (; d = wn(e, a, { debug: !1, startIndex: i }); )
    i = d.start + 1 + a.length, s.push(d);
  return s;
}
const z = {
  BYTE: (
    /** @type {1} */
    1
  ),
  ASCII: (
    /** @type {2} */
    2
  ),
  SHORT: (
    /** @type {3} */
    3
  ),
  LONG: (
    /** @type {4} */
    4
  ),
  RATIONAL: (
    /** @type {5} */
    5
  ),
  SBYTE: (
    /** @type {6} */
    6
  ),
  UNDEFINED: (
    /** @type {7} */
    7
  ),
  SSHORT: (
    /** @type {8} */
    8
  ),
  SLONG: (
    /** @type {9} */
    9
  ),
  SRATIONAL: (
    /** @type {10} */
    10
  ),
  FLOAT: (
    /** @type {11} */
    11
  ),
  DOUBLE: (
    /** @type {12} */
    12
  ),
  // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
  IFD: (
    /** @type {13} */
    13
  ),
  // introduced by BigTIFF
  LONG8: (
    /** @type {16} */
    16
  ),
  SLONG8: (
    /** @type {17} */
    17
  ),
  IFD8: (
    /** @type {18} */
    18
  )
}, pn = (
  /** @type {const} */
  {
    [z.BYTE]: 1,
    [z.ASCII]: 1,
    [z.SBYTE]: 1,
    [z.UNDEFINED]: 1,
    [z.SHORT]: 2,
    [z.SSHORT]: 2,
    [z.LONG]: 4,
    [z.SLONG]: 4,
    [z.FLOAT]: 4,
    [z.IFD]: 4,
    [z.RATIONAL]: 8,
    [z.SRATIONAL]: 8,
    [z.DOUBLE]: 8,
    [z.LONG8]: 8,
    [z.SLONG8]: 8,
    [z.IFD8]: 8
  }
);
function Ke(e) {
  const a = pn[e];
  if (a === void 0)
    throw new RangeError(`Invalid field type: ${e}`);
  return a;
}
const _n = (
  /** @type {const} */
  {
    NewSubfileType: { tag: 254, type: z.LONG, eager: !0 },
    SubfileType: { tag: 255, type: z.SHORT, eager: !0 },
    ImageWidth: { tag: 256, type: z.SHORT, eager: !0 },
    ImageLength: { tag: 257, type: z.SHORT, eager: !0 },
    BitsPerSample: { tag: 258, type: z.SHORT, isArray: !0, eager: !0 },
    Compression: { tag: 259, type: z.SHORT, eager: !0 },
    PhotometricInterpretation: { tag: 262, type: z.SHORT, eager: !0 },
    Threshholding: { tag: 263, type: z.SHORT },
    CellWidth: { tag: 264, type: z.SHORT },
    CellLength: { tag: 265, type: z.SHORT },
    FillOrder: { tag: 266, type: z.SHORT },
    DocumentName: { tag: 269, type: z.ASCII },
    ImageDescription: { tag: 270, type: z.ASCII },
    Make: { tag: 271, type: z.ASCII },
    Model: { tag: 272, type: z.ASCII },
    StripOffsets: { tag: 273, type: z.SHORT, isArray: !0 },
    Orientation: { tag: 274, type: z.SHORT },
    SamplesPerPixel: { tag: 277, type: z.SHORT, eager: !0 },
    RowsPerStrip: { tag: 278, type: z.SHORT, eager: !0 },
    StripByteCounts: { tag: 279, type: z.LONG, isArray: !0 },
    MinSampleValue: { tag: 280, type: z.SHORT, isArray: !0 },
    MaxSampleValue: { tag: 281, type: z.SHORT, isArray: !0 },
    XResolution: { tag: 282, type: z.RATIONAL },
    YResolution: { tag: 283, type: z.RATIONAL },
    PlanarConfiguration: { tag: 284, type: z.SHORT, eager: !0 },
    PageName: { tag: 285, type: z.ASCII },
    XPosition: { tag: 286, type: z.RATIONAL },
    YPosition: { tag: 287, type: z.RATIONAL },
    FreeOffsets: { tag: 288, type: z.LONG },
    FreeByteCounts: { tag: 289, type: z.LONG },
    GrayResponseUnit: { tag: 290, type: z.SHORT },
    GrayResponseCurve: { tag: 291, type: z.SHORT, isArray: !0 },
    T4Options: { tag: 292, type: z.LONG },
    T6Options: { tag: 293, type: z.LONG },
    ResolutionUnit: { tag: 296, type: z.SHORT },
    PageNumber: { tag: 297, type: z.SHORT, isArray: !0 },
    TransferFunction: { tag: 301, type: z.SHORT, isArray: !0 },
    Software: { tag: 305, type: z.ASCII },
    DateTime: { tag: 306, type: z.ASCII },
    Artist: { tag: 315, type: z.ASCII },
    HostComputer: { tag: 316, type: z.ASCII },
    Predictor: { tag: 317, type: z.SHORT },
    WhitePoint: { tag: 318, type: z.RATIONAL, isArray: !0 },
    PrimaryChromaticities: { tag: 319, type: z.RATIONAL, isArray: !0 },
    ColorMap: { tag: 320, type: z.SHORT, isArray: !0 },
    HalftoneHints: { tag: 321, type: z.SHORT, isArray: !0 },
    TileWidth: { tag: 322, type: z.SHORT, eager: !0 },
    TileLength: { tag: 323, type: z.SHORT, eager: !0 },
    TileOffsets: { tag: 324, type: z.LONG, isArray: !0 },
    TileByteCounts: { tag: 325, type: z.SHORT, isArray: !0 },
    InkSet: { tag: 332, type: z.SHORT },
    InkNames: { tag: 333, type: z.ASCII },
    NumberOfInks: { tag: 334, type: z.SHORT },
    DotRange: { tag: 336, type: z.BYTE, isArray: !0 },
    TargetPrinter: { tag: 337, type: z.ASCII },
    ExtraSamples: { tag: 338, type: z.BYTE, isArray: !0, eager: !0 },
    SampleFormat: { tag: 339, type: z.SHORT, isArray: !0, eager: !0 },
    SMinSampleValue: { tag: 340, isArray: !0 },
    SMaxSampleValue: { tag: 341, isArray: !0 },
    TransferRange: { tag: 342, type: z.SHORT, isArray: !0 },
    JPEGProc: { tag: 512, type: z.SHORT },
    JPEGInterchangeFormat: { tag: 513, type: z.LONG },
    JPEGInterchangeFormatLngth: { tag: 514, type: z.LONG },
    JPEGRestartInterval: { tag: 515, type: z.SHORT },
    JPEGLosslessPredictors: { tag: 517, type: z.SHORT, isArray: !0 },
    JPEGPointTransforms: { tag: 518, type: z.SHORT, isArray: !0 },
    JPEGQTables: { tag: 519, type: z.LONG, isArray: !0 },
    JPEGDCTables: { tag: 520, type: z.LONG, isArray: !0 },
    JPEGACTables: { tag: 521, type: z.LONG, isArray: !0 },
    YCbCrCoefficients: { tag: 529, type: z.RATIONAL, isArray: !0 },
    YCbCrSubSampling: { tag: 530, type: z.SHORT, isArray: !0 },
    YCbCrPositioning: { tag: 531, type: z.SHORT },
    ReferenceBlackWhite: { tag: 532, type: z.LONG, isArray: !0 },
    Copyright: { tag: 33432, type: z.ASCII },
    BadFaxLines: { tag: 326 },
    CleanFaxData: { tag: 327 },
    ClipPath: { tag: 343 },
    ConsecutiveBadFaxLines: { tag: 328 },
    Decode: { tag: 433 },
    DefaultImageColor: { tag: 434 },
    Indexed: { tag: 346 },
    JPEGTables: { tag: 347, isArray: !0, eager: !0 },
    StripRowCounts: { tag: 559, isArray: !0 },
    SubIFDs: { tag: 330, isArray: !0 },
    XClipPathUnits: { tag: 344 },
    YClipPathUnits: { tag: 345 },
    ApertureValue: { tag: 37378 },
    ColorSpace: { tag: 40961 },
    DateTimeDigitized: { tag: 36868 },
    DateTimeOriginal: { tag: 36867 },
    ExifIFD: { tag: 34665, name: "Exif IFD", type: z.LONG },
    ExifVersion: { tag: 36864 },
    ExposureTime: { tag: 33434 },
    FileSource: { tag: 41728 },
    Flash: { tag: 37385 },
    FlashpixVersion: { tag: 40960 },
    FNumber: { tag: 33437 },
    ImageUniqueID: { tag: 42016 },
    LightSource: { tag: 37384 },
    MakerNote: { tag: 37500 },
    ShutterSpeedValue: { tag: 37377 },
    UserComment: { tag: 37510 },
    IPTC: { tag: 33723 },
    CZ_LSMINFO: { tag: 34412 },
    ICCProfile: { tag: 34675, name: "ICC Profile" },
    XMP: { tag: 700 },
    GDAL_METADATA: { tag: 42112 },
    GDAL_NODATA: { tag: 42113, type: z.ASCII, eager: !0 },
    Photoshop: { tag: 34377 },
    ModelPixelScale: { tag: 33550, type: z.DOUBLE, isArray: !0, eager: !0 },
    ModelTiepoint: { tag: 33922, type: z.DOUBLE, isArray: !0, eager: !0 },
    ModelTransformation: { tag: 34264, type: z.DOUBLE, isArray: !0, eager: !0 },
    GeoKeyDirectory: { tag: 34735, type: z.SHORT, isArray: !0, eager: !0 },
    GeoDoubleParams: { tag: 34736, type: z.DOUBLE, isArray: !0, eager: !0 },
    GeoAsciiParams: { tag: 34737, type: z.ASCII, eager: !0 },
    LercParameters: { tag: 50674, eager: !0 }
  }
), at = {}, Xe = {};
function vn(e, a, t, s = !1, n = !1) {
  at[a] = e, Xe[e] = { tag: e, name: a, type: typeof t == "string" ? z[t] : t, isArray: s, eager: n };
}
for (const [e, a] of Object.entries(_n)) {
  const t = (
    /** @type {TagDictionaryEntry} */
    a
  );
  vn(t.tag, t.name || e, t.type, t.isArray, t.eager);
}
function ca(e) {
  return typeof e == "number" ? e : at[e];
}
const is = {
  256: "SHORT",
  257: "SHORT",
  258: "SHORT",
  259: "SHORT",
  262: "SHORT",
  270: "ASCII",
  271: "ASCII",
  272: "ASCII",
  273: "LONG",
  274: "SHORT",
  277: "SHORT",
  278: "LONG",
  279: "LONG",
  282: "RATIONAL",
  283: "RATIONAL",
  284: "SHORT",
  286: "SHORT",
  287: "RATIONAL",
  296: "SHORT",
  297: "SHORT",
  305: "ASCII",
  306: "ASCII",
  315: "ASCII",
  338: "SHORT",
  339: "SHORT",
  513: "LONG",
  514: "LONG",
  1024: "SHORT",
  1025: "SHORT",
  1026: "ASCII",
  2048: "SHORT",
  2049: "ASCII",
  2052: "SHORT",
  2054: "SHORT",
  2057: "DOUBLE",
  2059: "DOUBLE",
  2060: "SHORT",
  3072: "SHORT",
  3073: "ASCII",
  3076: "SHORT",
  4096: "SHORT",
  4097: "ASCII",
  4099: "SHORT",
  33432: "ASCII",
  33550: "DOUBLE",
  33922: "DOUBLE",
  34264: "DOUBLE",
  34665: "LONG",
  34735: "SHORT",
  34736: "DOUBLE",
  34737: "ASCII",
  42113: "ASCII"
}, X = {
  WhiteIsZero: 0,
  BlackIsZero: 1,
  RGB: 2,
  Palette: 3,
  CMYK: 5,
  YCbCr: 6,
  CIELab: 8
}, gn = {
  Unspecified: 0
}, V3 = {
  AddCompression: 1
}, H3 = {
  None: 0,
  Deflate: 1,
  Zstandard: 2
}, tt = (
  /** @type {const} */
  {
    1024: "GTModelTypeGeoKey",
    1025: "GTRasterTypeGeoKey",
    1026: "GTCitationGeoKey",
    2048: "GeographicTypeGeoKey",
    2049: "GeogCitationGeoKey",
    2050: "GeogGeodeticDatumGeoKey",
    2051: "GeogPrimeMeridianGeoKey",
    2052: "GeogLinearUnitsGeoKey",
    2053: "GeogLinearUnitSizeGeoKey",
    2054: "GeogAngularUnitsGeoKey",
    2055: "GeogAngularUnitSizeGeoKey",
    2056: "GeogEllipsoidGeoKey",
    2057: "GeogSemiMajorAxisGeoKey",
    2058: "GeogSemiMinorAxisGeoKey",
    2059: "GeogInvFlatteningGeoKey",
    2060: "GeogAzimuthUnitsGeoKey",
    2061: "GeogPrimeMeridianLongGeoKey",
    2062: "GeogTOWGS84GeoKey",
    3072: "ProjectedCSTypeGeoKey",
    3073: "PCSCitationGeoKey",
    3074: "ProjectionGeoKey",
    3075: "ProjCoordTransGeoKey",
    3076: "ProjLinearUnitsGeoKey",
    3077: "ProjLinearUnitSizeGeoKey",
    3078: "ProjStdParallel1GeoKey",
    3079: "ProjStdParallel2GeoKey",
    3080: "ProjNatOriginLongGeoKey",
    3081: "ProjNatOriginLatGeoKey",
    3082: "ProjFalseEastingGeoKey",
    3083: "ProjFalseNorthingGeoKey",
    3084: "ProjFalseOriginLongGeoKey",
    3085: "ProjFalseOriginLatGeoKey",
    3086: "ProjFalseOriginEastingGeoKey",
    3087: "ProjFalseOriginNorthingGeoKey",
    3088: "ProjCenterLongGeoKey",
    3089: "ProjCenterLatGeoKey",
    3090: "ProjCenterEastingGeoKey",
    3091: "ProjCenterNorthingGeoKey",
    3092: "ProjScaleAtNatOriginGeoKey",
    3093: "ProjScaleAtCenterGeoKey",
    3094: "ProjAzimuthAngleGeoKey",
    3095: "ProjStraightVertPoleLongGeoKey",
    3096: "ProjRectifiedGridAngleGeoKey",
    4096: "VerticalCSTypeGeoKey",
    4097: "VerticalCitationGeoKey",
    4098: "VerticalDatumGeoKey",
    4099: "VerticalUnitsGeoKey"
  }
);
for (const [e, a] of Object.entries(tt))
  ;
function yn(e, a) {
  const { width: t, height: s } = e, n = new Uint8Array(t * s * 3);
  let i;
  for (let d = 0, o = 0; d < e.length; ++d, o += 3)
    i = 256 - e[d] / a * 256, n[o] = i, n[o + 1] = i, n[o + 2] = i;
  return n;
}
function Mn(e, a) {
  const { width: t, height: s } = e, n = new Uint8Array(t * s * 3);
  let i;
  for (let d = 0, o = 0; d < e.length; ++d, o += 3)
    i = e[d] / a * 256, n[o] = i, n[o + 1] = i, n[o + 2] = i;
  return n;
}
function Cn(e, a) {
  const { width: t, height: s } = e, n = new Uint8Array(t * s * 3), i = a.length / 3, d = a.length / 3 * 2;
  for (let o = 0, c = 0; o < e.length; ++o, c += 3) {
    const r = e[o];
    n[c] = a[r] / 65536 * 256, n[c + 1] = a[r + i] / 65536 * 256, n[c + 2] = a[r + d] / 65536 * 256;
  }
  return n;
}
function Bn(e) {
  const { width: a, height: t } = e, s = new Uint8Array(a * t * 3);
  for (let n = 0, i = 0; n < e.length; n += 4, i += 3) {
    const d = e[n], o = e[n + 1], c = e[n + 2], r = e[n + 3];
    s[i] = 255 * ((255 - d) / 256) * ((255 - r) / 256), s[i + 1] = 255 * ((255 - o) / 256) * ((255 - r) / 256), s[i + 2] = 255 * ((255 - c) / 256) * ((255 - r) / 256);
  }
  return s;
}
function kn(e) {
  const { width: a, height: t } = e, s = new Uint8ClampedArray(a * t * 3);
  for (let n = 0, i = 0; n < e.length; n += 3, i += 3) {
    const d = e[n], o = e[n + 1], c = e[n + 2];
    s[i] = d + 1.402 * (c - 128), s[i + 1] = d - 0.34414 * (o - 128) - 0.71414 * (c - 128), s[i + 2] = d + 1.772 * (o - 128);
  }
  return s;
}
const Sn = 0.95047, En = 1, An = 1.08883;
function Pn(e) {
  const { width: a, height: t } = e, s = new Uint8Array(a * t * 3);
  for (let n = 0, i = 0; n < e.length; n += 3, i += 3) {
    const d = e[n + 0], o = e[n + 1] << 24 >> 24, c = e[n + 2] << 24 >> 24;
    let r = (d + 16) / 116, l = o / 500 + r, f = r - c / 200, h, u, m;
    l = Sn * (l * l * l > 8856e-6 ? l * l * l : (l - 16 / 116) / 7.787), r = En * (r * r * r > 8856e-6 ? r * r * r : (r - 16 / 116) / 7.787), f = An * (f * f * f > 8856e-6 ? f * f * f : (f - 16 / 116) / 7.787), h = l * 3.2406 + r * -1.5372 + f * -0.4986, u = l * -0.9689 + r * 1.8758 + f * 0.0415, m = l * 0.0557 + r * -0.204 + f * 1.057, h = h > 31308e-7 ? 1.055 * h ** (1 / 2.4) - 0.055 : 12.92 * h, u = u > 31308e-7 ? 1.055 * u ** (1 / 2.4) - 0.055 : 12.92 * u, m = m > 31308e-7 ? 1.055 * m ** (1 / 2.4) - 0.055 : 12.92 * m, s[i] = Math.max(0, Math.min(1, h)) * 255, s[i + 1] = Math.max(0, Math.min(1, u)) * 255, s[i + 2] = Math.max(0, Math.min(1, m)) * 255;
  }
  return s;
}
const Ye = /* @__PURE__ */ new Map();
async function ma(e) {
  const a = !e.hasTag("StripOffsets");
  return (
    /** @type {BaseDecoderParameters} */
    {
      tileWidth: a ? await e.loadValue("TileWidth") : await e.loadValue("ImageWidth"),
      tileHeight: a ? await e.loadValue("TileLength") : await e.loadValue("RowsPerStrip") || await e.loadValue("ImageLength"),
      planarConfiguration: await e.loadValue("PlanarConfiguration"),
      bitsPerSample: await e.loadValue("BitsPerSample"),
      predictor: await e.loadValue("Predictor") || 1
    }
  );
}
function Gn(e, a, t = ma, s = !0) {
  Array.isArray(e) || (e = [e]), e.forEach((n) => {
    Ye.set(n, { importFn: a, decoderParameterFn: t, preferWorker: s });
  });
}
async function xn(e, a) {
  if (!Ye.has(e))
    throw new Error(`Unknown compression method identifier: ${e}`);
  const { decoderParameterFn: t } = (
    /** @type {RegistryEntry} */
    Ye.get(e)
  );
  return t(a);
}
async function Un(e, a) {
  if (!Ye.has(e))
    throw new Error(`Unknown compression method identifier: ${e}`);
  const { importFn: t } = (
    /** @type {RegistryEntry} */
    Ye.get(e)
  ), s = await t();
  return new s(a);
}
const In = [
  // No compression
  {
    cases: [void 0, 1],
    importFn: () => import("./raw-ukTKQj5x.js").then((e) => e.default),
    preferWorker: !1
  },
  // LZW
  {
    cases: 5,
    importFn: () => import("./lzw-BgkaYJrx.js").then((e) => e.default)
  },
  // Old-style JPEG
  {
    cases: 6,
    importFn: () => {
      throw new Error("old style JPEG compression is not supported.");
    }
  },
  // JPEG
  {
    cases: 7,
    importFn: () => import("./jpeg-CTz_gVJG.js").then((e) => e.default),
    /**
     * @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
     */
    decoderParameterFn: async (e) => ({
      ...await ma(e),
      JPEGTables: await e.loadValue("JPEGTables")
    })
  },
  // Deflate / Adobe Deflate
  {
    cases: [8, 32946],
    importFn: () => import("./deflate-DbdubXof.js").then((e) => e.default)
  },
  // PackBits
  {
    cases: 32773,
    importFn: () => import("./packbits-DW2-7-UD.js").then((e) => e.default)
  },
  // LERC
  {
    cases: 34887,
    importFn: () => import("./lerc-C8kdlHj3.js").then(async (e) => (await e.zstd.init(), e)).then((e) => e.default),
    /**
     * @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
     */
    decoderParameterFn: async (e) => ({
      ...await ma(e),
      LercParameters: await e.loadValue("LercParameters")
    })
  },
  // zstd
  {
    cases: 5e4,
    importFn: () => import("./zstd-n9GO9DYt.js").then(async (e) => (await e.zstd.init(), e)).then((e) => e.default)
  },
  // WebP Images
  {
    cases: 50001,
    importFn: () => import("./webimage-C0JGnRvP.js").then((e) => e.default),
    /**
     * @param {import("../imagefiledirectory.js").ImageFileDirectory} fileDirectory
     */
    decoderParameterFn: async (e) => ({
      ...await ma(e),
      samplesPerPixel: Number(await e.loadValue("SamplesPerPixel")) || 4
    }),
    preferWorker: !1
  }
];
for (const e of In) {
  const { cases: a, importFn: t, decoderParameterFn: s, preferWorker: n } = e;
  Gn(a, t, s, n);
}
function Ea(e, a, t, s = 1) {
  return new (Object.getPrototypeOf(e)).constructor(a * t * s);
}
function Tn(e, a, t, s, n) {
  const i = a / s, d = t / n;
  return e.map((o) => {
    const c = Ea(o, s, n);
    for (let r = 0; r < n; ++r) {
      const l = Math.min(Math.round(d * r), t - 1);
      for (let f = 0; f < s; ++f) {
        const h = Math.min(Math.round(i * f), a - 1), u = o[l * a + h];
        c[r * s + f] = u;
      }
    }
    return c;
  });
}
function Ce(e, a, t) {
  return (1 - t) * e + t * a;
}
function Nn(e, a, t, s, n) {
  const i = a / s, d = t / n;
  return e.map((o) => {
    const c = Ea(o, s, n);
    for (let r = 0; r < n; ++r) {
      const l = d * r, f = Math.floor(l), h = Math.min(Math.ceil(l), t - 1);
      for (let u = 0; u < s; ++u) {
        const m = i * u, b = m % 1, w = Math.floor(m), p = Math.min(Math.ceil(m), a - 1), v = o[f * a + w], C = o[f * a + p], k = o[h * a + w], g = o[h * a + p], B = Ce(Ce(v, C, b), Ce(k, g, b), l % 1);
        c[r * s + u] = B;
      }
    }
    return c;
  });
}
function jn(e, a, t, s, n, i = "nearest") {
  switch (i.toLowerCase()) {
    case "nearest":
      return Tn(e, a, t, s, n);
    case "bilinear":
    case "linear":
      return Nn(e, a, t, s, n);
    default:
      throw new Error(`Unsupported resampling method: '${i}'`);
  }
}
function Rn(e, a, t, s, n, i) {
  const d = a / s, o = t / n, c = Ea(e, s, n, i);
  for (let r = 0; r < n; ++r) {
    const l = Math.min(Math.round(o * r), t - 1);
    for (let f = 0; f < s; ++f) {
      const h = Math.min(Math.round(d * f), a - 1);
      for (let u = 0; u < i; ++u) {
        const m = e[l * a * i + h * i + u];
        c[r * s * i + f * i + u] = m;
      }
    }
  }
  return c;
}
function On(e, a, t, s, n, i) {
  const d = a / s, o = t / n, c = Ea(e, s, n, i);
  for (let r = 0; r < n; ++r) {
    const l = o * r, f = Math.floor(l), h = Math.min(Math.ceil(l), t - 1);
    for (let u = 0; u < s; ++u) {
      const m = d * u, b = m % 1, w = Math.floor(m), p = Math.min(Math.ceil(m), a - 1);
      for (let v = 0; v < i; ++v) {
        const C = e[f * a * i + w * i + v], k = e[f * a * i + p * i + v], g = e[h * a * i + w * i + v], B = e[h * a * i + p * i + v], S = Ce(Ce(C, k, b), Ce(g, B, b), l % 1);
        c[r * s * i + u * i + v] = S;
      }
    }
  }
  return c;
}
function Dn(e, a, t, s, n, i, d = "nearest") {
  switch (d.toLowerCase()) {
    case "nearest":
      return Rn(e, a, t, s, n, i);
    case "bilinear":
    case "linear":
      return On(e, a, t, s, n, i);
    default:
      throw new Error(`Unsupported resampling method: '${d}'`);
  }
}
function Fn(e, a, t) {
  let s = 0;
  for (let n = a; n < t; ++n)
    s += e[n];
  return s;
}
function Fa(e, a, t) {
  let s;
  switch (e) {
    case 1:
      a <= 8 ? s = Uint8Array : a <= 16 ? s = Uint16Array : a <= 32 && (s = Uint32Array);
      break;
    case 2:
      a === 8 ? s = Int8Array : a === 16 ? s = Int16Array : a === 32 && (s = Int32Array);
      break;
    case 3:
      switch (a) {
        case 16:
        case 32:
          s = Float32Array;
          break;
        case 64:
          s = Float64Array;
          break;
      }
      break;
  }
  if (s) {
    if (typeof t == "number")
      return new s(t);
    if (t instanceof ArrayBuffer)
      return new s(t);
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function Ln(e, a) {
  return (e === 1 || e === 2) && a <= 32 && a % 8 === 0 ? !1 : !(e === 3 && (a === 16 || a === 32 || a === 64));
}
function qn(e, a, t, s, n, i, d) {
  const o = new DataView(e), c = t === 2 ? d * i : d * i * s, r = t === 2 ? 1 : s, l = Fa(a, n, c), f = parseInt("1".repeat(n), 2);
  if (a === 1) {
    let h;
    t === 1 ? h = s * n : h = n;
    let u = i * h;
    (u & 7) !== 0 && (u = u + 7 & -8);
    for (let m = 0; m < d; ++m) {
      const b = m * u;
      for (let w = 0; w < i; ++w) {
        const p = b + w * r * n;
        for (let v = 0; v < r; ++v) {
          const C = p + v * n, k = (m * i + w) * r + v, g = Math.floor(C / 8), B = C % 8;
          if (B + n <= 8)
            l[k] = o.getUint8(g) >> 8 - n - B & f;
          else if (B + n <= 16)
            l[k] = o.getUint16(g) >> 16 - n - B & f;
          else if (B + n <= 24) {
            const S = o.getUint16(g) << 8 | o.getUint8(g + 2);
            l[k] = S >> 24 - n - B & f;
          } else
            l[k] = o.getUint32(g) >> 32 - n - B & f;
        }
      }
    }
  }
  return l.buffer;
}
class Vn {
  /**
   * @constructor
   * @param {import("./imagefiledirectory.js").ImageFileDirectory} fileDirectory The parsed file directory
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource.js').BaseSource} source The datasource to read from
   */
  constructor(a, t, s, n) {
    this.fileDirectory = a, this.littleEndian = t, this.tiles = s ? [] : null, this.isTiled = !a.hasTag("StripOffsets");
    const i = a.getValue("PlanarConfiguration") ?? 1;
    if (i !== 1 && i !== 2)
      throw new Error("Invalid planar configuration.");
    this.planarConfiguration = i, this.source = n;
  }
  /**
   * Returns the associated parsed file directory.
   * @returns {import("./imagefiledirectory.js").ImageFileDirectory} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }
  /**
   * Returns the associated parsed geo keys.
   * @returns {Partial<Record<import('./globals.js').GeoKeyName, *>>|null} the parsed geo keys
   */
  getGeoKeys() {
    return this.fileDirectory.parseGeoKeyDirectory();
  }
  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.getValue("ImageWidth") || 0;
  }
  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.getValue("ImageLength") || 0;
  }
  /**
   * Returns the number of samples per pixel.
   * @returns {number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    return this.fileDirectory.getValue("SamplesPerPixel") ?? 1;
  }
  /**
   * Returns the width of each tile.
   * @returns {number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.getValue("TileWidth") || 0 : this.getWidth();
  }
  /**
   * Returns the height of each tile.
   * @returns {number} the height of each tile
   */
  getTileHeight() {
    if (this.isTiled)
      return this.fileDirectory.getValue("TileLength") || 0;
    const a = this.fileDirectory.hasTag("RowsPerStrip") && this.fileDirectory.getValue("RowsPerStrip");
    return a ? Math.min(a, this.getHeight()) : this.getHeight();
  }
  getBlockWidth() {
    return this.getTileWidth();
  }
  /**
   * @param {number} y
   * @returns {number}
   */
  getBlockHeight(a) {
    return this.isTiled || (a + 1) * this.getTileHeight() <= this.getHeight() ? this.getTileHeight() : this.getHeight() - a * this.getTileHeight();
  }
  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let a = 0;
    const t = this.fileDirectory.getValue("BitsPerSample") || [];
    for (let s = 0; s < t.length; ++s)
      a += this.getSampleByteSize(s);
    return a;
  }
  /**
   * @param {number} i
   * @returns {number}
   */
  getSampleByteSize(a) {
    const t = this.fileDirectory.getValue("BitsPerSample") || [];
    if (a >= t.length)
      throw new RangeError(`Sample index ${a} is out of range.`);
    return Math.ceil(t[a] / 8);
  }
  /**
   * @param {number} sampleIndex
   * @returns {(this: DataView, byteOffset: number, littleEndian: boolean) => number}
   */
  getReaderForSample(a) {
    const t = this.fileDirectory.getValue("SampleFormat"), s = t ? t[a] : 1, n = (this.fileDirectory.getValue("BitsPerSample") || [])[a];
    switch (s) {
      case 1:
        if (n <= 8)
          return DataView.prototype.getUint8;
        if (n <= 16)
          return DataView.prototype.getUint16;
        if (n <= 32)
          return DataView.prototype.getUint32;
        break;
      case 2:
        if (n <= 8)
          return DataView.prototype.getInt8;
        if (n <= 16)
          return DataView.prototype.getInt16;
        if (n <= 32)
          return DataView.prototype.getInt32;
        break;
      case 3:
        switch (n) {
          case 16:
            return function(i, d) {
              return ns(this, i, d);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
        }
        break;
    }
    throw Error("Unsupported data format/bitsPerSample");
  }
  getSampleFormat(a = 0) {
    const t = this.fileDirectory.getValue("SampleFormat");
    return t ? t[a] : 1;
  }
  getBitsPerSample(a = 0) {
    const t = this.fileDirectory.getValue("BitsPerSample");
    return t ? t[a] : 0;
  }
  /**
   * @param {number} sampleIndex
   * @param {number|ArrayBufferLike} sizeOrData
   * @returns {TypedArray}
   */
  getArrayForSample(a, t) {
    const s = (
      /** @type {1|2|3} */
      this.getSampleFormat(a)
    ), n = this.getBitsPerSample(a);
    return Fa(s, n, t);
  }
  /**
   * Returns the decoded strip or tile.
   * @param {Number} x the strip or tile x-offset
   * @param {Number} y the tile y-offset (0 for stripped images)
   * @param {Number} sample the sample to get for separated samples
   * @param {DecoderWorker|import("./geotiff.js").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise.<{x: number, y: number, sample: number, data: ArrayBufferLike}>} the decoded strip or tile
   */
  async getTileOrStrip(a, t, s, n, i) {
    const d = Math.ceil(this.getWidth() / this.getTileWidth()), o = Math.ceil(this.getHeight() / this.getTileHeight());
    let c;
    const { tiles: r } = this;
    if (this.planarConfiguration === 1 ? c = t * d + a : this.planarConfiguration === 2 && (c = s * d * o + t * d + a), c === void 0)
      throw new Error("Could not determine tile or strip index.");
    let l, f;
    if (this.isTiled ? (l = Number(await this.fileDirectory.loadValueIndexed("TileOffsets", c)), f = Number(await this.fileDirectory.loadValueIndexed("TileByteCounts", c))) : (l = Number(await this.fileDirectory.loadValueIndexed("StripOffsets", c)), f = Number(await this.fileDirectory.loadValueIndexed("StripByteCounts", c))), f === 0) {
      const m = this.getBlockHeight(t) * this.getTileWidth(), b = this.planarConfiguration === 2 ? this.getSampleByteSize(s) : this.getBytesPerPixel(), w = new ArrayBuffer(m * b);
      return this.getArrayForSample(s, w).fill(this.getGDALNoData() || 0), { x: a, y: t, sample: s, data: w };
    }
    const h = (await this.source.fetch([{ offset: l, length: f }], i))[0];
    let u;
    return r === null || !r[c] ? (u = (async () => {
      let m = await n.decode(h);
      const b = (
        /** @type {1|2|3} */
        this.getSampleFormat()
      ), w = this.getBitsPerSample();
      return Ln(b, w) && (m = qn(m, b, this.planarConfiguration, this.getSamplesPerPixel(), w, this.getTileWidth(), this.getBlockHeight(t))), m;
    })(), r !== null && (r[c] = u)) : u = r[c], { x: a, y: t, sample: s, data: await u };
  }
  /**
   * Internal read function.
   * @private
   * @param {Array<number>} imageWindow The image window in pixel coordinates
   * @param {Array<number>} samples The selected samples (0-based indices)
   * @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
   * @param {boolean|undefined} interleave Whether or not to write in an interleaved manner
   * @param {DecoderWorker|import("./geotiff.js").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {number} [width] the width of window to be read into
   * @param {number} [height] the height of window to be read into
   * @param {string} [resampleMethod] the resampling method to be used when interpolating
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise<ReadRasterResult>}
   */
  async _readRaster(a, t, s, n, i, d, o, c, r) {
    const l = this.getTileWidth(), f = this.getTileHeight(), h = this.getWidth(), u = this.getHeight(), m = Math.max(Math.floor(a[0] / l), 0), b = Math.min(Math.ceil(a[2] / l), Math.ceil(h / l)), w = Math.max(Math.floor(a[1] / f), 0), p = Math.min(Math.ceil(a[3] / f), Math.ceil(u / f)), v = a[2] - a[0];
    let C = this.getBytesPerPixel();
    const k = [], g = [];
    for (let E = 0; E < t.length; ++E) {
      if (this.planarConfiguration === 1) {
        const T = await this.fileDirectory.loadValue("BitsPerSample");
        if (typeof T != "object")
          throw new Error("Expected BitsPerSample to be an array or typed array.");
        k.push(Fn(T, 0, t[E]) / 8);
      } else
        k.push(0);
      g.push(this.getReaderForSample(t[E]));
    }
    const B = [], { littleEndian: S } = this;
    for (let E = w; E < p; ++E)
      for (let T = m; T < b; ++T) {
        let N;
        this.planarConfiguration === 1 && (N = this.getTileOrStrip(T, E, 0, i, r));
        for (let Z = 0; Z < t.length; ++Z) {
          const ee = Z, Pa = t[Z];
          if (this.planarConfiguration === 2 && (C = this.getSampleByteSize(Pa), N = this.getTileOrStrip(T, E, Pa, i, r)), !N)
            throw new Error("Could not get tile or strip data.");
          const Ns = N.then((Ge) => {
            const js = Ge.data, Rs = new DataView(js), Ga = this.getBlockHeight(Ge.y), xe = Ge.y * f, oa = Ge.x * l, Os = xe + Ga, Ds = (Ge.x + 1) * l, Fs = g[ee], Ls = Math.min(Ga, Ga - (Os - a[3]), u - xe), qs = Math.min(l, l - (Ds - a[2]), h - oa);
            for (let Ue = Math.max(0, a[1] - xe); Ue < Ls; ++Ue)
              for (let Ie = Math.max(0, a[0] - oa); Ie < qs; ++Ie) {
                const Vs = (Ue * l + Ie) * C, _t = Fs.call(Rs, Vs + k[ee], S);
                let da;
                n ? (da = (Ue + xe - a[1]) * v * t.length + (Ie + oa - a[0]) * t.length + ee, s[da] = _t) : (da = (Ue + xe - a[1]) * v + Ie + oa - a[0], s[ee][da] = _t);
              }
          });
          B.push(Ns);
        }
      }
    if (await Promise.all(B), d && a[2] - a[0] !== d || o && a[3] - a[1] !== o) {
      let E;
      n ? E = Dn(
        /** @type {TypedArray} */
        s,
        a[2] - a[0],
        a[3] - a[1],
        /** @type {number} */
        d,
        /** @type {number} */
        o,
        t.length,
        c
      ) : E = jn(
        /** @type {TypedArray[]} */
        s,
        a[2] - a[0],
        a[3] - a[1],
        /** @type {number} */
        d,
        /** @type {number} */
        o,
        c
      );
      const T = (
        /** @type {ReadRasterResult} */
        E
      );
      return T.width = d ?? a[2] - a[0], T.height = o ?? a[3] - a[1], T;
    }
    const A = (
      /** @type {ReadRasterResult} */
      s
    );
    return A.width = d || a[2] - a[0], A.height = o || a[3] - a[1], A;
  }
  /**
   * @overload
   * @param {ReadRastersOptions & {interleave: true}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayWithDimensions>} the decoded arrays as a promise
   */
  /**
   * @overload
   * @param {ReadRastersOptions & {interleave: false}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the decoded arrays as a promise
   */
  /**
   * @overload
   * @param {ReadRastersOptions & {interleave: boolean}} options optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  /**
   * @overload
   * @param {ReadRastersOptions} [options={}] optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the decoded arrays as a promise
   */
  /**
   * Reads raster data from the image. This function reads all selected samples
   * into separate arrays of the correct type for that sample or into a single
   * combined array when `interleave` is set. When provided, only a subset
   * of the raster is read for each sample.
   *
   * @param {ReadRastersOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  async readRasters(a = {}) {
    const { window: t, samples: s = [], pool: n = null, width: i, height: d, resampleMethod: o, fillValue: c, signal: r } = a, l = "interleave" in a && a.interleave, f = t || [0, 0, this.getWidth(), this.getHeight()];
    if (f[0] > f[2] || f[1] > f[3])
      throw new Error("Invalid subsets");
    const h = f[2] - f[0], u = f[3] - f[1], m = h * u, b = this.getSamplesPerPixel();
    if (!s || !s.length)
      for (let g = 0; g < b; ++g)
        s.push(g);
    else
      for (let g = 0; g < s.length; ++g)
        if (s[g] >= b)
          return Promise.reject(new RangeError(`Invalid sample index '${s[g]}'.`));
    let w;
    if (l) {
      const { fileDirectory: g } = this, B = g.getValue("SampleFormat"), S = B ? Math.max.apply(null, Array.from(B)) : 1;
      if (S !== 1 && S !== 2 && S !== 3)
        throw new Error("Unsupported sample format for interleaved data. Must be 1, 2, or 3.");
      const A = g.getValue("BitsPerSample"), E = A ? Math.max.apply(null, Array.from(A)) : 8;
      if (w = Fa(S, E, m * s.length), c) {
        if (Array.isArray(c))
          throw new Error("When reading interleaved data, fillValue must be a single number.");
        w.fill(c);
      }
    } else {
      w = [];
      for (let g = 0; g < s.length; ++g) {
        const B = this.getArrayForSample(s[g], m);
        Array.isArray(c) && g < c.length ? B.fill(c[g]) : c && !Array.isArray(c) && B.fill(c), w.push(B);
      }
    }
    const p = this.fileDirectory.getValue("Compression") || 1, v = await xn(p, this.fileDirectory), C = n ? n.bindParameters(p, v) : await Un(p, v);
    return await this._readRaster(f, s, w, l, C, i, d, o, r);
  }
  /**
   * @overload
   * @param {ReadRGBOptions & {interleave: true}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayWithDimensions>} the RGB array as a Promise
   */
  /**
   * @overload
   * @param {ReadRGBOptions & {interleave: false}} options optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the RGB array as a Promise
   */
  /**
   * @overload
   * @param {ReadRGBOptions & {interleave: boolean}} options optional parameters
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  /**
   * @overload
   * @param {ReadRGBOptions} [options={}] optional parameters
   * @returns {Promise<import("./geotiff.js").TypedArrayArrayWithDimensions>} the RGB array as a Promise
   */
  /**
   * Reads raster data from the image as RGB.
   * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
   * When no other method is applicable, the first sample is used to produce a
   * grayscale image.
   * When provided, only a subset of the raster is read for each sample.
   *
   * @param {ReadRGBOptions} [options] optional parameters
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  async readRGB(a = {}) {
    const { window: t, pool: s = null, width: n, height: i, resampleMethod: d, enableAlpha: o = !1, signal: c } = a, r = ("interleave" in a && a.interleave) ?? !1, l = t || [0, 0, this.getWidth(), this.getHeight()];
    if (l[0] > l[2] || l[1] > l[3])
      throw new Error("Invalid subsets");
    const f = this.fileDirectory.getValue("PhotometricInterpretation");
    if (f === X.RGB) {
      let C = [0, 1, 2];
      const k = this.fileDirectory.getValue("ExtraSamples");
      if (k && k[0] !== gn.Unspecified && o) {
        C = [];
        const g = this.fileDirectory.getValue("BitsPerSample") || [];
        for (let B = 0; B < g.length; B += 1)
          C.push(B);
      }
      return this.readRasters({
        window: t,
        interleave: r,
        samples: C,
        pool: s,
        width: n,
        height: i,
        resampleMethod: d,
        signal: c
      });
    }
    let h;
    switch (f) {
      case X.WhiteIsZero:
      case X.BlackIsZero:
      case X.Palette:
        h = [0];
        break;
      case X.CMYK:
        h = [0, 1, 2, 3];
        break;
      case X.YCbCr:
      case X.CIELab:
        h = [0, 1, 2];
        break;
      default:
        throw new Error("Invalid or unsupported photometric interpretation.");
    }
    const u = {
      window: l,
      /** @type {true} */
      interleave: !0,
      samples: h,
      pool: s,
      width: n,
      height: i,
      resampleMethod: d,
      signal: c
    }, { fileDirectory: m } = this, b = await this.readRasters(u), w = 2 ** this.getBitsPerSample(0);
    let p;
    switch (f) {
      case X.WhiteIsZero:
        p = yn(b, w);
        break;
      case X.BlackIsZero:
        p = Mn(b, w);
        break;
      case X.Palette:
        p = Cn(
          b,
          /** @type {Uint16Array} */
          await m.loadValue("ColorMap")
        );
        break;
      case X.CMYK:
        p = Bn(b);
        break;
      case X.YCbCr:
        p = kn(b);
        break;
      case X.CIELab:
        p = Pn(b);
        break;
      default:
        throw new Error("Unsupported photometric interpretation.");
    }
    if (!r) {
      const C = new Uint8Array(p.length / 3), k = new Uint8Array(p.length / 3), g = new Uint8Array(p.length / 3);
      for (let B = 0, S = 0; B < p.length; B += 3, ++S)
        C[S] = p[B], k[S] = p[B + 1], g[S] = p[B + 2];
      p = [C, k, g];
    }
    const v = (
      /** @type {import("./geotiff.js").ReadRasterResult} */
      p
    );
    return v.width = b.width, v.height = b.height, v;
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Promise<Array<{i: number, j: number, k: number, x: number, y: number, z: number}>>} the tiepoints
   */
  async getTiePoints() {
    if (!this.fileDirectory.hasTag("ModelTiepoint"))
      return [];
    const a = await this.fileDirectory.loadValue("ModelTiepoint");
    if (typeof a != "object")
      throw new Error("Expected ModelTiepoint to be an array or typed array.");
    const t = [];
    for (let s = 0; s < a.length; s += 6)
      t.push({
        i: a[s],
        j: a[s + 1],
        k: a[s + 2],
        x: a[s + 3],
        y: a[s + 4],
        z: a[s + 5]
      });
    return t;
  }
  /**
   * Returns the parsed GDAL metadata items.
   *
   * If sample is passed to null, dataset-level metadata will be returned.
   * Otherwise only metadata specific to the provided sample will be returned.
   *
   * @param {number|null} [sample=null] The sample index.
   * @returns {Promise<Record<string, unknown>|null>} The GDAL metadata items
   */
  async getGDALMetadata(a = null) {
    const t = {};
    if (!this.fileDirectory.hasTag("GDAL_METADATA"))
      return null;
    const s = await this.fileDirectory.loadValue("GDAL_METADATA");
    let n = zn(s, "Item");
    a === null ? n = n.filter((i) => xa(i, "sample") === void 0) : n = n.filter((i) => Number(xa(i, "sample")) === a);
    for (let i = 0; i < n.length; ++i) {
      const d = n[i];
      t[xa(d, "name")] = d.inner;
    }
    return t;
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    const a = this.fileDirectory.hasTag("GDAL_NODATA") && this.fileDirectory.getValue("GDAL_NODATA");
    return a ? Number(a.substring(0, a.length - 1)) : null;
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const a = this.fileDirectory.getValue("ModelTiepoint"), t = this.fileDirectory.getValue("ModelTransformation");
    if (a && a.length === 6)
      return [
        a[3],
        a[4],
        a[5]
      ];
    if (t)
      return [
        t[3],
        t[7],
        t[11]
      ];
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns the image resolution as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @param {GeoTIFFImage|null} [referenceImage=null] A reference image to calculate the resolution from
   *                                             in cases when the current image does not have the
   *                                             required tags on its own.
   * @returns {Array<number>} The resolution as a vector
   */
  getResolution(a = null) {
    const t = this.fileDirectory.getValue("ModelPixelScale"), s = this.fileDirectory.getValue("ModelTransformation");
    if (t)
      return [
        t[0],
        -t[1],
        t[2]
      ];
    if (s)
      return s[1] === 0 && s[4] === 0 ? [
        s[0],
        -s[5],
        s[10]
      ] : [
        Math.sqrt(s[0] * s[0] + s[4] * s[4]),
        -Math.sqrt(s[1] * s[1] + s[5] * s[5]),
        s[10]
      ];
    if (a) {
      const [n, i, d] = a.getResolution();
      return [
        n * a.getWidth() / this.getWidth(),
        i * a.getHeight() / this.getHeight(),
        d * a.getWidth() / this.getWidth()
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns whether or not the pixels of the image depict an area (or point).
   * @returns {Boolean} Whether the pixels are a point
   */
  pixelIsArea() {
    return this.getGeoKeys()?.GTRasterTypeGeoKey === 1;
  }
  /**
   * Returns the image bounding box as an array of 4 values: min-x, min-y,
   * max-x and max-y. When the image has no affine transformation, then an
   * exception is thrown.
   * @param {boolean} [tilegrid=false] If true return extent for a tilegrid
   *                                   without adjustment for ModelTransformation.
   * @returns {Array<number>} The bounding box
   */
  getBoundingBox(a = !1) {
    const t = this.getHeight(), s = this.getWidth(), n = this.fileDirectory.getValue("ModelTransformation");
    if (n && !a) {
      const [i, d, , o, c, r, , l] = n, h = [
        [0, 0],
        [0, t],
        [s, 0],
        [s, t]
      ].map(([b, w]) => [
        o + i * b + d * w,
        l + c * b + r * w
      ]), u = h.map((b) => b[0]), m = h.map((b) => b[1]);
      return [
        Math.min(...u),
        Math.min(...m),
        Math.max(...u),
        Math.max(...m)
      ];
    } else {
      const i = this.getOrigin(), d = this.getResolution(), o = i[0], c = i[1], r = o + d[0] * s, l = c + d[1] * t;
      return [
        Math.min(o, r),
        Math.min(c, l),
        Math.max(o, r),
        Math.max(c, l)
      ];
    }
  }
}
class Hn {
  /**
   * @param {ArrayBufferLike} arrayBuffer
   */
  constructor(a) {
    this._dataView = new DataView(a);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getUint64(a, t) {
    const s = this.getUint32(a, t), n = this.getUint32(a + 4, t);
    let i;
    if (t) {
      if (i = s + 2 ** 32 * n, !Number.isSafeInteger(i))
        throw new Error(`${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      return i;
    }
    if (i = 2 ** 32 * s + n, !Number.isSafeInteger(i))
      throw new Error(`${i} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    return i;
  }
  /**
   * Adapted from https://stackoverflow.com/a/55338384/8060591
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getInt64(a, t) {
    let s = 0;
    const n = (this._dataView.getUint8(a + (t ? 7 : 0)) & 128) > 0;
    let i = !0;
    for (let d = 0; d < 8; d++) {
      let o = this._dataView.getUint8(a + (t ? d : 7 - d));
      n && (i ? o !== 0 && (o = ~(o - 1) & 255, i = !1) : o = ~o & 255), s += o * 256 ** d;
    }
    return n && (s = -s), s;
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  getUint8(a) {
    return this._dataView.getUint8(a);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  getInt8(a) {
    return this._dataView.getInt8(a);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getUint16(a, t) {
    return this._dataView.getUint16(a, t);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getInt16(a, t) {
    return this._dataView.getInt16(a, t);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getUint32(a, t) {
    return this._dataView.getUint32(a, t);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getInt32(a, t) {
    return this._dataView.getInt32(a, t);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getFloat16(a, t) {
    return ns(this._dataView, a, t);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getFloat32(a, t) {
    return this._dataView.getFloat32(a, t);
  }
  /**
   * @param {number} offset
   * @param {boolean} littleEndian
   * @returns {number}
   */
  getFloat64(a, t) {
    return this._dataView.getFloat64(a, t);
  }
}
class pa {
  /**
   * @param {ArrayBufferLike} arrayBuffer
   * @param {number} sliceOffset
   * @param {boolean} littleEndian
   * @param {boolean} bigTiff
   */
  constructor(a, t, s, n) {
    this._dataView = new DataView(a), this._sliceOffset = t, this._littleEndian = s, this._bigTiff = n;
  }
  get sliceOffset() {
    return this._sliceOffset;
  }
  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }
  get littleEndian() {
    return this._littleEndian;
  }
  get bigTiff() {
    return this._bigTiff;
  }
  get buffer() {
    return this._dataView.buffer;
  }
  /**
   * @param {number} offset
   * @param {number} length
   * @returns {boolean}
   */
  covers(a, t) {
    return this.sliceOffset <= a && this.sliceTop >= a + t;
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint8(a) {
    return this._dataView.getUint8(a - this._sliceOffset);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readInt8(a) {
    return this._dataView.getInt8(a - this._sliceOffset);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint16(a) {
    return this._dataView.getUint16(a - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readInt16(a) {
    return this._dataView.getInt16(a - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint32(a) {
    return this._dataView.getUint32(a - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readInt32(a) {
    return this._dataView.getInt32(a - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readFloat32(a) {
    return this._dataView.getFloat32(a - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readFloat64(a) {
    return this._dataView.getFloat64(a - this._sliceOffset, this._littleEndian);
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readUint64(a) {
    const t = this.readUint32(a), s = this.readUint32(a + 4);
    let n;
    if (this._littleEndian) {
      if (n = t + 2 ** 32 * s, !Number.isSafeInteger(n))
        throw new Error(`${n} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      return n;
    }
    if (n = 2 ** 32 * t + s, !Number.isSafeInteger(n))
      throw new Error(`${n} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    return n;
  }
  /**
   * Adapted from https://stackoverflow.com/a/55338384/8060591
   * @param {number} offset
   * @returns {number}
   */
  readInt64(a) {
    let t = 0;
    const s = (this._dataView.getUint8(a + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let n = !0;
    for (let i = 0; i < 8; i++) {
      let d = this._dataView.getUint8(a + (this._littleEndian ? i : 7 - i));
      s && (n ? d !== 0 && (d = ~(d - 1) & 255, n = !1) : d = ~d & 255), t += d * 256 ** i;
    }
    return s && (t = -t), t;
  }
  /**
   * @param {number} offset
   * @returns {number}
   */
  readOffset(a) {
    return this._bigTiff ? this.readUint64(a) : this.readUint32(a);
  }
}
const yt = `\r
\r
`;
function os(e) {
  if (typeof Object.fromEntries < "u")
    return Object.fromEntries(e);
  const a = {};
  for (const [t, s] of e)
    a[t.toLowerCase()] = s;
  return a;
}
function $n(e) {
  const a = e.split(`\r
`).map((t) => {
    const s = (
      /** @type {[string, string]} */
      t.split(":").map((n) => n.trim())
    );
    return s[0] = s[0].toLowerCase(), s;
  });
  return os(a);
}
function Kn(e) {
  if (!e)
    return { type: null, params: {} };
  const [a, ...t] = e.split(";").map((n) => n.trim()), s = (
    /** @type {Array<[string, string]>} */
    t.map((n) => n.split("="))
  );
  return { type: a, params: os(s) };
}
function La(e) {
  let a = NaN, t = NaN, s = NaN;
  return e && ([, a, t, s] = (e.match(/bytes (\d+)-(\d+)\/(\d+)/) || []).map(Number)), { start: a, end: t, total: s };
}
function Xn(e, a) {
  let t = -1;
  const s = new TextDecoder("ascii"), n = [], i = `--${a}`, d = `${i}--`;
  for (let o = 0; o < 10; ++o)
    s.decode(new Uint8Array(e, o, i.length)) === i && (t = o);
  if (t === -1)
    throw new Error("Could not find initial boundary");
  for (; t < e.byteLength; ) {
    const o = s.decode(new Uint8Array(e, t, Math.min(i.length + 1024, e.byteLength - t)));
    if (o.length === 0 || o.startsWith(d))
      break;
    if (!o.startsWith(i))
      throw new Error("Part does not start with boundary");
    const c = o.substr(i.length + 2);
    if (c.length === 0)
      break;
    const r = c.indexOf(yt), l = $n(c.substr(0, r)), { start: f, end: h, total: u } = La(l["content-range"]), m = t + i.length + r + yt.length, b = h + 1 - f;
    n.push({
      headers: l,
      data: e.slice(m, m + b),
      offset: f,
      length: b,
      fileSize: u
    }), t = m + b + 4;
  }
  return n;
}
class ds {
  /**
   * @param {Array<Slice>} slices
   * @param {AbortSignal} [signal]
   * @returns {Promise<ArrayBufferLike[]>}
   */
  async fetch(a, t) {
    return Promise.all(a.map(async (s) => (await this.fetchSlice(s, t)).data));
  }
  /**
   * @param {Slice} slice
   * @param {AbortSignal} [_signal]
   * @returns {Promise<SliceWithData>}
   */
  async fetchSlice(a, t) {
    throw new Error(`fetching of slice ${a} not possible, not implemented`);
  }
  /**
   * Returns the filesize if already determined and null otherwise
   * @returns {number|null}
   */
  get fileSize() {
    return null;
  }
  async close() {
  }
}
class Yn extends Map {
  constructor(a = {}) {
    if (super(), !(a.maxSize && a.maxSize > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    if (typeof a.maxAge == "number" && a.maxAge === 0)
      throw new TypeError("`maxAge` must be a number greater than 0");
    this.maxSize = a.maxSize, this.maxAge = a.maxAge || Number.POSITIVE_INFINITY, this.onEviction = a.onEviction, this.cache = /* @__PURE__ */ new Map(), this.oldCache = /* @__PURE__ */ new Map(), this._size = 0;
  }
  // TODO: Use private class methods when targeting Node.js 16.
  _emitEvictions(a) {
    if (typeof this.onEviction == "function")
      for (const [t, s] of a)
        this.onEviction(t, s.value);
  }
  _deleteIfExpired(a, t) {
    return typeof t.expiry == "number" && t.expiry <= Date.now() ? (typeof this.onEviction == "function" && this.onEviction(a, t.value), this.delete(a)) : !1;
  }
  _getOrDeleteIfExpired(a, t) {
    if (this._deleteIfExpired(a, t) === !1)
      return t.value;
  }
  _getItemValue(a, t) {
    return t.expiry ? this._getOrDeleteIfExpired(a, t) : t.value;
  }
  _peek(a, t) {
    const s = t.get(a);
    return this._getItemValue(a, s);
  }
  _set(a, t) {
    this.cache.set(a, t), this._size++, this._size >= this.maxSize && (this._size = 0, this._emitEvictions(this.oldCache), this.oldCache = this.cache, this.cache = /* @__PURE__ */ new Map());
  }
  _moveToRecent(a, t) {
    this.oldCache.delete(a), this._set(a, t);
  }
  *_entriesAscending() {
    for (const a of this.oldCache) {
      const [t, s] = a;
      this.cache.has(t) || this._deleteIfExpired(t, s) === !1 && (yield a);
    }
    for (const a of this.cache) {
      const [t, s] = a;
      this._deleteIfExpired(t, s) === !1 && (yield a);
    }
  }
  get(a) {
    if (this.cache.has(a)) {
      const t = this.cache.get(a);
      return this._getItemValue(a, t);
    }
    if (this.oldCache.has(a)) {
      const t = this.oldCache.get(a);
      if (this._deleteIfExpired(a, t) === !1)
        return this._moveToRecent(a, t), t.value;
    }
  }
  set(a, t, { maxAge: s = this.maxAge } = {}) {
    const n = typeof s == "number" && s !== Number.POSITIVE_INFINITY ? Date.now() + s : void 0;
    return this.cache.has(a) ? this.cache.set(a, {
      value: t,
      expiry: n
    }) : this._set(a, { value: t, expiry: n }), this;
  }
  has(a) {
    return this.cache.has(a) ? !this._deleteIfExpired(a, this.cache.get(a)) : this.oldCache.has(a) ? !this._deleteIfExpired(a, this.oldCache.get(a)) : !1;
  }
  peek(a) {
    if (this.cache.has(a))
      return this._peek(a, this.cache);
    if (this.oldCache.has(a))
      return this._peek(a, this.oldCache);
  }
  delete(a) {
    const t = this.cache.delete(a);
    return t && this._size--, this.oldCache.delete(a) || t;
  }
  clear() {
    this.cache.clear(), this.oldCache.clear(), this._size = 0;
  }
  resize(a) {
    if (!(a && a > 0))
      throw new TypeError("`maxSize` must be a number greater than 0");
    const t = [...this._entriesAscending()], s = t.length - a;
    s < 0 ? (this.cache = new Map(t), this.oldCache = /* @__PURE__ */ new Map(), this._size = t.length) : (s > 0 && this._emitEvictions(t.slice(0, s)), this.oldCache = new Map(t.slice(s)), this.cache = /* @__PURE__ */ new Map(), this._size = 0), this.maxSize = a;
  }
  *keys() {
    for (const [a] of this)
      yield a;
  }
  *values() {
    for (const [, a] of this)
      yield a;
  }
  *[Symbol.iterator]() {
    for (const a of this.cache) {
      const [t, s] = a;
      this._deleteIfExpired(t, s) === !1 && (yield [t, s.value]);
    }
    for (const a of this.oldCache) {
      const [t, s] = a;
      this.cache.has(t) || this._deleteIfExpired(t, s) === !1 && (yield [t, s.value]);
    }
  }
  *entriesDescending() {
    let a = [...this.cache];
    for (let t = a.length - 1; t >= 0; --t) {
      const s = a[t], [n, i] = s;
      this._deleteIfExpired(n, i) === !1 && (yield [n, i.value]);
    }
    a = [...this.oldCache];
    for (let t = a.length - 1; t >= 0; --t) {
      const s = a[t], [n, i] = s;
      this.cache.has(n) || this._deleteIfExpired(n, i) === !1 && (yield [n, i.value]);
    }
  }
  *entriesAscending() {
    for (const [a, t] of this._entriesAscending())
      yield [a, t.value];
  }
  get size() {
    if (!this._size)
      return this.oldCache.size;
    let a = 0;
    for (const t of this.oldCache.keys())
      this.cache.has(t) || a++;
    return Math.min(this._size + a, this.maxSize);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(a, t = this) {
    for (const [s, n] of this.entriesAscending())
      a.call(t, n, s, this);
  }
  get [Symbol.toStringTag]() {
    return JSON.stringify([...this.entriesAscending()]);
  }
}
function cs(e, a) {
  for (const t in a)
    a.hasOwnProperty(t) && (e[t] = a[t]);
  return e;
}
function rs(e, a) {
  return e.length < a.length ? !1 : e.substr(e.length - a.length) === a;
}
function Wn(e, a) {
  const { length: t } = e;
  for (let s = 0; s < t; s++)
    a(e[s], s);
}
function Jn(e) {
  const a = {};
  for (const t in e)
    if (e.hasOwnProperty(t)) {
      const s = e[t];
      a[s] = t;
    }
  return a;
}
function q(e, a) {
  const t = [];
  for (let s = 0; s < e; s++)
    t.push(a(s));
  return t;
}
async function Qn(e) {
  return new Promise((a) => setTimeout(a, e));
}
function Zn(e, a) {
  const t = Array.isArray(e) ? e : Array.from(e), s = Array.isArray(a) ? a : Array.from(a);
  return t.map((n, i) => [n, s[i]]);
}
class me extends Error {
  constructor(...a) {
    super(...a), Error.captureStackTrace && Error.captureStackTrace(this, me), this.name = "AbortError", this.signal = void 0;
  }
}
class e1 extends Error {
  constructor(a, t) {
    super(t), this.errors = a, this.message = t, this.name = "AggregateError";
  }
}
const a1 = e1;
function t1(e) {
  if (ArrayBuffer.isView(e)) {
    const a = e.constructor;
    if (a === Float32Array || a === Float64Array)
      return !0;
  }
  return !1;
}
function s1(e) {
  if (ArrayBuffer.isView(e)) {
    const a = e.constructor;
    if (a === Int8Array || a === Int16Array || a === Int32Array)
      return !0;
  }
  return !1;
}
function n1(e) {
  if (ArrayBuffer.isView(e)) {
    const a = e.constructor;
    if (a === Uint8Array || a === Uint16Array || a === Uint32Array || a === Uint8ClampedArray)
      return !0;
  }
  return !1;
}
const i1 = {
  Float64Array,
  Float32Array,
  Uint32Array,
  Uint16Array,
  Uint8Array
};
class o1 {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {ArrayBuffer} data
   */
  constructor(a, t, s) {
    this.offset = a, this.length = t, this.data = s;
  }
  /**
   * @returns {number} the top byte border
   */
  get top() {
    return this.offset + this.length;
  }
}
class Mt {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {number[]} blockIds
   */
  constructor(a, t, s) {
    this.offset = a, this.length = t, this.blockIds = s;
  }
}
class d1 extends ds {
  /**
   *
   * @param {BaseSource} source The underlying source that shall be blocked and cached
   * @param {object} options
   * @param {number} [options.blockSize]
   * @param {number} [options.cacheSize]
   */
  constructor(a, { blockSize: t = 65536, cacheSize: s = 100 } = {}) {
    super(), this.source = a, this.blockSize = t, this.blockCache = new Yn({
      maxSize: s,
      onEviction: (n, i) => {
        this.evictedBlocks.set(n, i);
      }
    }), this.evictedBlocks = /* @__PURE__ */ new Map(), this.blockRequests = /* @__PURE__ */ new Map(), this.blockIdsToFetch = /* @__PURE__ */ new Set(), this.abortedBlockIds = /* @__PURE__ */ new Set();
  }
  get fileSize() {
    return this.source.fileSize;
  }
  /**
   * @param {import("./basesource.js").Slice[]} slices
   * @param {AbortSignal} [signal]
   * @return {Promise<ArrayBuffer[]>}
   */
  async fetch(a, t) {
    const s = [], n = [], i = [];
    this.evictedBlocks.clear();
    for (const { offset: h, length: u } of a) {
      let m = h + u;
      const { fileSize: b } = this;
      b !== null && (m = Math.min(m, b));
      const w = Math.floor(h / this.blockSize) * this.blockSize;
      for (let p = w; p < m; p += this.blockSize) {
        const v = Math.floor(p / this.blockSize);
        !this.blockCache.has(v) && !this.blockRequests.has(v) && (this.blockIdsToFetch.add(v), n.push(v)), this.blockRequests.has(v) && s.push(this.blockRequests.get(v)), i.push(v);
      }
    }
    await Qn(), this.fetchBlocks(t);
    const d = [];
    for (const h of n)
      this.blockRequests.has(h) && d.push(this.blockRequests.get(h));
    await Promise.allSettled(s), await Promise.allSettled(d);
    const o = [], c = i.filter((h) => this.abortedBlockIds.has(h) || !this.blockCache.has(h));
    if (c.forEach((h) => this.blockIdsToFetch.add(h)), c.length > 0 && t && !t.aborted) {
      this.fetchBlocks();
      for (const h of c) {
        const u = this.blockRequests.get(h);
        if (!u)
          throw new Error(`Block ${h} is not in the block requests`);
        o.push(u);
      }
      await Promise.allSettled(o);
    }
    if (t && t.aborted)
      throw new me("Request was aborted");
    const r = i.map((h) => this.blockCache.get(h) || this.evictedBlocks.get(h)), l = r.filter((h) => !h);
    if (l.length)
      throw new a1(l, "Request failed");
    const f = new Map(Zn(i, r));
    return this.readSliceData(a, f);
  }
  /**
   * @param {AbortSignal} [signal]
   */
  fetchBlocks(a) {
    if (this.blockIdsToFetch.size > 0) {
      const t = this.groupBlocks(this.blockIdsToFetch), s = t.map(async (n) => ({ ...n, ...await this.source.fetchSlice(n, a) }));
      for (let n = 0; n < t.length; ++n) {
        const i = t[n];
        for (const d of i.blockIds)
          this.blockRequests.set(d, (async () => {
            try {
              const o = (await Promise.all(s))[n], c = d * this.blockSize, r = c - o.offset, l = Math.min(r + this.blockSize, o.data.byteLength), f = o.data.slice(r, l), h = new o1(
                c,
                f.byteLength,
                /** @type {ArrayBuffer} */
                f
              );
              this.blockCache.set(d, h), this.abortedBlockIds.delete(d);
            } catch (o) {
              if (o instanceof me && o.name === "AbortError")
                o.signal = a, this.blockCache.delete(d), this.abortedBlockIds.add(d);
              else
                throw o;
            } finally {
              this.blockRequests.delete(d);
            }
          })());
      }
      this.blockIdsToFetch.clear();
    }
  }
  /**
   *
   * @param {Set<number>} blockIds
   * @returns {BlockGroup[]}
   */
  groupBlocks(a) {
    const t = Array.from(a).sort((d, o) => d - o);
    if (t.length === 0)
      return [];
    let s = [], n = null;
    const i = [];
    for (const d of t)
      n === null || n + 1 === d ? (s.push(d), n = d) : (i.push(new Mt(s[0] * this.blockSize, s.length * this.blockSize, s)), s = [d], n = d);
    return i.push(new Mt(s[0] * this.blockSize, s.length * this.blockSize, s)), i;
  }
  /**
   * @param {import("./basesource.js").Slice[]} slices
   * @param {Map<number, Block>} blocks
   * @returns {ArrayBuffer[]}
   */
  readSliceData(a, t) {
    return a.map((s) => {
      let n = s.offset + s.length;
      this.fileSize !== null && (n = Math.min(this.fileSize, n));
      const i = Math.floor(s.offset / this.blockSize), d = Math.floor((n - 1) / this.blockSize), o = new ArrayBuffer(s.length), c = new Uint8Array(o);
      for (let r = i; r <= d; ++r) {
        const l = t.get(r);
        if (!l)
          continue;
        const f = l.offset - s.offset, h = l.top - n;
        let u = 0, m = 0, b;
        f < 0 ? u = -f : f > 0 && (m = f), h < 0 ? b = l.length - u : b = n - l.offset - u;
        const w = new Uint8Array(l.data, u, b);
        c.set(w, m);
      }
      return o;
    });
  }
}
class st {
  /**
   * Returns whether the response has an ok'ish status code
   */
  get ok() {
    return this.status >= 200 && this.status <= 299;
  }
  /**
   * Returns the status code of the response
   * @returns {number} the status code
   */
  get status() {
    throw new Error("not implemented");
  }
  /**
   * Returns the value of the specified header
   * @param {string} _headerName the header name
   * @returns {string|undefined} the header value
   */
  getHeader(a) {
    throw new Error("not implemented");
  }
  /**
   * @returns {Promise<ArrayBuffer>} the response data of the request
   */
  async getData() {
    throw new Error("not implemented");
  }
}
class nt {
  /** @param {string} url */
  constructor(a) {
    this.url = a;
  }
  /**
   * Send a request with the options
   * @param {RequestInit} [_options={}]
   * @returns {Promise<BaseResponse>}
   */
  async request(a) {
    throw new Error("request is not implemented");
  }
}
class c1 extends st {
  /**
   * BaseResponse facade for fetch API Response
   * @param {Response} response
   */
  constructor(a) {
    super(), this.response = a;
  }
  get status() {
    return this.response.status;
  }
  /**
   * @param {string} name
   * @returns {string|undefined}
   */
  getHeader(a) {
    return this.response.headers.get(a) || void 0;
  }
  async getData() {
    return this.response.arrayBuffer ? await this.response.arrayBuffer() : (await /** @type {*} */
    this.response.buffer()).buffer;
  }
}
class r1 extends nt {
  /**
   * @param {string} url
   * @param {RequestCredentials} [credentials]
   */
  constructor(a, t) {
    super(a), this.credentials = t;
  }
  /**
   * @param {RequestInit} [options={}]
   * @returns {Promise<FetchResponse>}
   */
  async request({ headers: a, signal: t } = {}) {
    const s = await fetch(this.url, {
      headers: a,
      credentials: this.credentials,
      signal: t
    });
    return new c1(s);
  }
}
class h1 extends st {
  /**
   * BaseResponse facade for XMLHttpRequest
   * @param {XMLHttpRequest} xhr
   * @param {ArrayBuffer} data
   */
  constructor(a, t) {
    super(), this.xhr = a, this.data = t;
  }
  get status() {
    return this.xhr.status;
  }
  /**
   * @param {string} name
   * @returns {string|undefined}
   */
  getHeader(a) {
    return this.xhr.getResponseHeader(a) || void 0;
  }
  async getData() {
    return this.data;
  }
}
class f1 extends nt {
  /**
   * @param {Object<string, string>} headers
   * @param {AbortSignal} [signal]
   * @returns {Promise<XHRResponse>}
   */
  constructRequest(a, t) {
    return new Promise((s, n) => {
      const i = new XMLHttpRequest();
      i.open("GET", this.url), i.responseType = "arraybuffer";
      for (const [d, o] of Object.entries(a))
        i.setRequestHeader(d, o);
      i.onload = () => {
        const d = i.response;
        s(new h1(i, d));
      }, i.onerror = n, i.onabort = () => n(new me("Request aborted")), i.send(), t && (t.aborted && i.abort(), t.addEventListener("abort", () => i.abort()));
    });
  }
  async request({ headers: a = {}, signal: t = void 0 } = {}) {
    return await this.constructRequest(a, t);
  }
}
var Ia = {};
class l1 extends st {
  /**
   * BaseResponse facade for node HTTP/HTTPS API Response
   * @param {import('http').IncomingMessage} response
   * @param {Promise<ArrayBuffer>} dataPromise
   */
  constructor(a, t) {
    super(), this.response = a, this.dataPromise = t;
  }
  get status() {
    return (
      /** @type {number} */
      this.response.statusCode
    );
  }
  /**
   * @param {string} name
   * @returns {string|undefined}
   */
  getHeader(a) {
    const t = this.response.headers[a];
    return Array.isArray(t) ? t.join(", ") : t;
  }
  async getData() {
    return await this.dataPromise;
  }
}
class m1 extends nt {
  /** @param {string} url */
  constructor(a) {
    super(a), this.parsedUrl = Ia.parse(this.url), this.httpApi = (this.parsedUrl.protocol === "http:", Ia);
  }
  /**
   * @param {Object<string, string>} headers
   * @param {AbortSignal} [signal]
   * @returns {Promise<HttpResponse>}
   */
  constructRequest(a, t) {
    return new Promise((s, n) => {
      const i = this.httpApi.get({
        ...this.parsedUrl,
        headers: a
      }, (d) => {
        const o = new Promise((c) => {
          const r = [];
          d.on("data", (l) => {
            r.push(l);
          }), d.on("end", () => {
            const l = Buffer.concat(r).buffer;
            c(l);
          }), d.on("error", n);
        });
        s(new l1(d, o));
      });
      i.on("error", n), t && (t.aborted && i.destroy(new me("Request aborted")), t.addEventListener("abort", () => i.destroy(new me("Request aborted"))));
    });
  }
  async request({ headers: a = {}, signal: t = void 0 } = {}) {
    return await this.constructRequest(a, t);
  }
}
class it extends ds {
  /**
   * @param {import("../geotiff.js").BaseClient} client
   * @param {RemoteSourceOptions} options
   */
  constructor(a, { headers: t, maxRanges: s = 0, allowFullFile: n } = {}) {
    super(), this.client = a, this.headers = t, this.maxRanges = s, this.allowFullFile = n, this._fileSize = null;
  }
  /**
   * @param {import('./basesource.js').Slice[]} slices
   * @param {AbortSignal} [signal]
   * @returns {Promise<ArrayBufferLike[]>}
   */
  async fetch(a, t) {
    return this.maxRanges >= a.length ? this.fetchSlices(a, t).then((s) => s.map((n) => n.data)) : (this.maxRanges > 0 && a.length > 1, Promise.all(a.map(async (s) => (await this.fetchSlice(s, t)).data)));
  }
  /**
   * @param {Array<import('./basesource.js').Slice>} slices
   * @param {AbortSignal} [signal]
   * @returns {Promise<Array<import('./basesource.js').SliceWithData>>}
   */
  async fetchSlices(a, t) {
    const s = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${a.map(({ offset: n, length: i }) => `${n}-${n + i - 1}`).join(",")}`
      },
      signal: t
    });
    if (s.ok)
      if (s.status === 206) {
        const { type: n, params: i } = Kn(s.getHeader("content-type"));
        if (n === "multipart/byteranges") {
          const f = Xn(await s.getData(), i.boundary);
          return this._fileSize = f[0].fileSize || null, f;
        }
        const d = await s.getData(), { start: o, end: c, total: r } = La(s.getHeader("content-range"));
        this._fileSize = r || null;
        const l = [{
          data: d,
          offset: o,
          length: c + 1 - o
        }];
        if (a.length > 1) {
          const f = await Promise.all(a.slice(1).map((h) => this.fetchSlice(h, t)));
          return l.concat(f);
        }
        return l;
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const n = await s.getData();
        return this._fileSize = n.byteLength, [{
          data: n,
          offset: 0,
          length: n.byteLength
        }];
      }
    else throw new Error("Error fetching data.");
  }
  /**
   * @param {import('./basesource.js').Slice} slice
   * @param {AbortSignal} [signal]
   * @returns {Promise<import('./basesource.js').SliceWithData>}
   */
  async fetchSlice(a, t) {
    const { offset: s, length: n } = a, i = await this.client.request({
      headers: {
        ...this.headers,
        Range: `bytes=${s}-${s + n - 1}`
      },
      signal: t
    });
    if (i.ok)
      if (i.status === 206) {
        const d = await i.getData(), { total: o } = La(i.getHeader("content-range"));
        return this._fileSize = o || null, {
          data: d,
          offset: s,
          length: n
        };
      } else {
        if (!this.allowFullFile)
          throw new Error("Server responded with full file");
        const d = await i.getData();
        return this._fileSize = d.byteLength, {
          data: d,
          offset: 0,
          length: d.byteLength
        };
      }
    else throw new Error("Error fetching data.");
  }
  get fileSize() {
    return this._fileSize;
  }
}
function ot(e, { blockSize: a, cacheSize: t }) {
  return a === void 0 ? e : new d1(e, { blockSize: a, cacheSize: t });
}
function u1(e, { headers: a = {}, credentials: t, maxRanges: s = 0, allowFullFile: n = !1, ...i } = {}) {
  const d = new r1(e, t), o = new it(d, { headers: a, maxRanges: s, allowFullFile: n });
  return ot(o, i);
}
function b1(e, { headers: a = {}, maxRanges: t = 0, allowFullFile: s = !1, ...n } = {}) {
  const i = new f1(e), d = new it(i, { headers: a, maxRanges: t, allowFullFile: s });
  return ot(d, n);
}
function w1(e, { headers: a = {}, maxRanges: t = 0, allowFullFile: s = !1, ...n } = {}) {
  const i = new m1(e), d = new it(i, { headers: a, maxRanges: t, allowFullFile: s });
  return ot(d, n);
}
function z1(e, { forceXHR: a = !1, ...t } = {}) {
  return typeof fetch == "function" && !a ? u1(e, t) : typeof XMLHttpRequest < "u" ? b1(e, t) : w1(e, t);
}
function pe(e, a) {
  switch (e) {
    case z.BYTE:
    case z.ASCII:
    case z.UNDEFINED:
      return new Uint8Array(a);
    case z.SBYTE:
      return new Int8Array(a);
    case z.SHORT:
      return new Uint16Array(a);
    case z.SSHORT:
      return new Int16Array(a);
    case z.LONG:
    case z.IFD:
      return new Uint32Array(a);
    case z.SLONG:
      return new Int32Array(a);
    case z.LONG8:
    case z.IFD8:
      return new Array(a);
    case z.SLONG8:
      return new Array(a);
    case z.RATIONAL:
      return new Uint32Array(a * 2);
    case z.SRATIONAL:
      return new Int32Array(a * 2);
    case z.FLOAT:
      return new Float32Array(a);
    case z.DOUBLE:
      return new Float64Array(a);
    default:
      throw new RangeError(`Invalid field type: ${e}`);
  }
}
function _e(e, a) {
  switch (a) {
    case z.BYTE:
    case z.ASCII:
    case z.UNDEFINED:
      return e.readUint8;
    case z.SBYTE:
      return e.readInt8;
    case z.SHORT:
      return e.readUint16;
    case z.SSHORT:
      return e.readInt16;
    case z.LONG:
    case z.IFD:
      return e.readUint32;
    case z.SLONG:
      return e.readInt32;
    case z.LONG8:
    case z.IFD8:
      return e.readUint64;
    case z.SLONG8:
      return e.readInt64;
    case z.RATIONAL:
      return e.readUint32;
    case z.SRATIONAL:
      return e.readInt32;
    case z.FLOAT:
      return e.readFloat32;
    case z.DOUBLE:
      return e.readFloat64;
    default:
      throw new RangeError(`Invalid field type: ${a}`);
  }
}
function Ne(e = null, a, t, s, n, i, d = !1) {
  const o = Ke(s), c = e || pe(s, n), r = s === z.RATIONAL || s === z.SRATIONAL;
  if (r)
    for (let l = 0; l < n; l += 2)
      c[l] = a.call(t, i + l * o), c[l + 1] = a.call(t, i + (l * o + 4));
  else
    for (let l = 0; l < n; ++l)
      c[l] = a.call(t, i + l * o);
  return s === z.ASCII ? new TextDecoder("utf-8").decode(
    /** @type {Uint8Array} */
    c
  ) : n === 1 && !d && !r ? c[0] : c;
}
class p1 {
  /**
   * Creates a DeferredArray for lazy-loading of large TIFF field arrays.
   * @param {import("./source/basesource.js").BaseSource} source - Data source for fetching
   * @param {number} arrayOffset - Byte offset where the array data starts
   * @param {boolean} littleEndian - Endianness of the data
   * @param {import('./globals.js').FieldType} fieldType - TIFF field type constant
   * @param {number} length - Number of elements in the array
   */
  constructor(a, t, s, n, i) {
    this.source = a, this.arrayOffset = t, this.littleEndian = s, this.fieldType = n, this.length = i, this.data = pe(n, i), this.itemSize = Ke(n), this.maskBitmap = new Uint8Array(Math.ceil(i / 8)), this.fetchIndexPromises = /* @__PURE__ */ new Map(), this.fullFetchPromise = null;
  }
  /**
   * Loads all values in the deferred array at once.
   * Subsequent calls return the same promise to avoid redundant fetches.
   * @returns {Promise<import('./geotiff.js').TypedArray|Array<number>>} Promise resolving to the fully loaded array
   */
  async loadAll() {
    return this.fullFetchPromise || (this.fullFetchPromise = this.source.fetch([{
      offset: this.arrayOffset,
      length: this.itemSize * this.length
    }]).then((a) => {
      const t = new pa(a[0], this.arrayOffset, !0, !1), s = Ne(this.data, _e(t, this.fieldType), t, this.fieldType, this.length, this.arrayOffset, !0);
      return this.maskBitmap.fill(255), this.fetchIndexPromises.clear(), s;
    })), this.fullFetchPromise;
  }
  /**
   * Loads and returns a single value at the specified index.
   * If the value is already loaded, returns it immediately. Otherwise, fetches it
   * from the source. Multiple calls for the same index reuse the same promise.
   * @param {number} index - Zero-based index of the value to load
   * @returns {Promise<number|bigint>} Promise resolving to the value at the given index
   * @throws {RangeError} If index is out of bounds
   */
  async get(a) {
    if (a < 0 || a >= this.data.length)
      throw new RangeError(`Index ${a} out of bounds for length ${this.data.length}`);
    const t = Math.floor(a / 8), s = 1 << a % 8, n = this.arrayOffset + a * this.itemSize;
    if ((this.maskBitmap[t] & s) === 0) {
      if (!this.fetchIndexPromises.has(a)) {
        const i = this.source.fetch([{
          offset: n,
          length: this.itemSize
        }]).then((d) => {
          const o = new pa(d[0], this.arrayOffset + a * this.itemSize, !0, !1), r = _e(o, this.fieldType).call(o, n);
          return this.data[a] = r, this.maskBitmap[t] |= s, this.fetchIndexPromises.delete(a), r;
        });
        this.fetchIndexPromises.set(a, i);
      }
      return this.fetchIndexPromises.get(a);
    }
    return this.data[a];
  }
}
class _1 {
  /**
   * Create an ImageFileDirectory.
   * @param {Map<string|number, number|string|Array<number|string>>} actualizedFields the file directory,
   * mapping tag names to values
   * @param {Map<string|number, Function>} deferredFields the deferred fields, mapping tag names to async functions
   * @param {Map<string|number, DeferredArray>} deferredArrays the deferred arrays, mapping tag names to
   * DeferredArray objects
   * @param {number} nextIFDByteOffset the byte offset to the next IFD
   */
  constructor(a, t, s, n) {
    this.actualizedFields = a, this.deferredFields = t, this.deferredFieldsBeingResolved = /* @__PURE__ */ new Map(), this.deferredArrays = s, this.nextIFDByteOffset = n;
  }
  /**
   * @param {import('./globals.js').TagName|number} tagIdentifier The field tag ID or name
   * @returns {boolean} whether the field exists (actualized or deferred)
   */
  hasTag(a) {
    const t = ca(a);
    return this.actualizedFields.has(t) || this.deferredFields.has(t) || this.deferredArrays.has(t);
  }
  /**
   * Synchronously retrieves the value for a given tag. If it is deferred, an error is thrown.
   * @template {import('./globals.js').EagerTagName | import('./globals.js').EagerTag} [T=any]
   * @param {T} tagIdentifier The field tag ID or name
   * @returns {T extends import('./globals.js').TagName ? (import('./globals.js').TagValue<T> | undefined) : any}
   * the field value,
   * or undefined if it does not exist
   * @throws {Error} If the tag is deferred and requires asynchronous loading
   */
  getValue(a) {
    const t = ca(a);
    if (this.deferredFields.has(t) || this.deferredArrays.has(t)) {
      const n = Xe[t]?.name || `Tag${t}`;
      throw new Error(`Field '${n}' (${t}) is deferred. Use loadValue() to load it asynchronously.`);
    }
    if (this.actualizedFields.has(t))
      return (
        /** @type {any} */
        this.actualizedFields.get(t)
      );
  }
  /**
   * Retrieves the value for a given tag. If it is deferred, it will be loaded first.
   * @template {import('./globals.js').TagName} [T=any]
   * @param {T|number} tagIdentifier The field tag ID or name
   * @returns {Promise<T extends import('./globals.js').TagName ? (import('./globals.js').TagValue<T> | undefined) : any>}
   *   the field value, or undefined if it does not exist
   */
  async loadValue(a) {
    const t = ca(a);
    if (this.actualizedFields.has(t))
      return (
        /** @type {any} */
        this.actualizedFields.get(t)
      );
    if (this.deferredFieldsBeingResolved.has(t))
      return (
        /** @type {any} */
        this.deferredFieldsBeingResolved.get(t)
      );
    const s = this.deferredFields.get(t);
    if (s) {
      this.deferredFields.delete(t);
      const i = (async () => {
        try {
          const d = await s();
          return this.actualizedFields.set(t, d), d;
        } finally {
          this.deferredFieldsBeingResolved.delete(t);
        }
      })();
      return this.deferredFieldsBeingResolved.set(t, i), /** @type {any} */
      i;
    }
    const n = this.deferredArrays.get(t);
    if (n)
      return (
        /** @type {any} */
        n.loadAll()
      );
  }
  /**
   * Retrieves the value at a given index for a tag that is an array. If it is deferred, it will be loaded first.
   * @param {number|string} tagIdentifier The field tag ID or name
   * @param {number} index The index within the array
   * @returns {Promise<number|string|bigint|undefined>} the field value at the given index, or undefined if it does not exist
   */
  async loadValueIndexed(a, t) {
    const s = ca(a);
    if (this.actualizedFields.has(s))
      return (
        /** @type {any} */
        this.actualizedFields.get(s)[t]
      );
    if (this.deferredArrays.has(s))
      return /** @type {DeferredArray} */ this.deferredArrays.get(s).get(t);
    if (this.hasTag(s)) {
      const n = await this.loadValue(s);
      if (n && typeof n != "number")
        return n[t];
    }
  }
  /**
   * Parses the GeoTIFF GeoKeyDirectory tag into a structured object.
   * The GeoKeyDirectory is a special TIFF tag that contains geographic metadata
   * in a key-value format as defined by the GeoTIFF specification.
   * @returns {Partial<Record<import('./globals.js').GeoKeyName, *>>|null} Parsed geo key directory
   *     mapping key names to values, or null if not present
   * @throws {Error} If a referenced geo key value cannot be retrieved
   */
  parseGeoKeyDirectory() {
    const a = this.getValue("GeoKeyDirectory");
    if (!a)
      return null;
    const t = {};
    for (let s = 4; s <= a[3] * 4; s += 4) {
      const n = (
        /** @type {Record<number, import('./globals.js').GeoKeyName>} */
        tt[a[s]]
      ), i = (
        /** @type {import('./globals.js').EagerTag} */
        a[s + 1] || null
      ), d = a[s + 2], o = a[s + 3];
      let c = null;
      if (!i)
        c = o;
      else {
        if (c = this.getValue(i), typeof c > "u" || c === null)
          throw new Error(`Could not get value of geoKey '${n}'.`);
        typeof c == "string" ? c = c.substring(o, o + d - 1) : c.subarray && (c = c.subarray(o, o + d), d === 1 && (c = c[0]));
      }
      t[n] = c;
    }
    return t;
  }
  toObject() {
    const a = {};
    for (const [t, s] of this.actualizedFields.entries()) {
      const n = typeof t == "number" ? Xe[t] : void 0, i = n ? n.name : `Tag${t}`;
      a[i] = s;
    }
    return a;
  }
}
class v1 {
  /**
   * @param {import("./source/basesource.js").BaseSource} source the data source to fetch from
   * @param {boolean} littleEndian the endianness of the file
   * @param {boolean} bigTiff whether the file is a BigTIFF
   * @param {boolean} [eager=false] whether to eagerly fetch deferred fields.
   *                                 When false (default), tags are loaded lazily on-demand.
   *                                 When true, all tags are loaded immediately during parsing.
   */
  constructor(a, t, s, n = !1) {
    this.source = a, this.littleEndian = t, this.bigTiff = s, this.eager = n;
  }
  /**
   * Helper function to retrieve a DataSlice from the source.
   * @param {number} offset Byte offset of the slice
   * @param {number} [length] Length of the slice
   * @returns {Promise<DataSlice>}
   */
  async getSlice(a, t) {
    const s = this.bigTiff ? 4048 : 1024;
    return new pa((await this.source.fetch([
      {
        offset: a,
        length: typeof t < "u" ? t : s
      }
    ]))[0], a, this.littleEndian, this.bigTiff);
  }
  /**
   * Instructs to parse an image file directory at the given file offset.
   * As there is no way to ensure that a location is indeed the start of an IFD,
   * this function must be called with caution (e.g only using the IFD offsets from
   * the headers or other IFDs).
   * @param {number} offset the offset to parse the IFD at
   * @returns {Promise<ImageFileDirectory>} the parsed IFD
   */
  async parseFileDirectoryAt(a) {
    const t = this.bigTiff ? 20 : 12, s = this.bigTiff ? 8 : 2;
    let n = await this.getSlice(a);
    const i = this.bigTiff ? n.readUint64(a) : n.readUint16(a), d = i * (t + (this.bigTiff ? 16 : 6));
    n.covers(a, d) || (n = await this.getSlice(a, d));
    const o = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    let l = a + (this.bigTiff ? 8 : 2);
    for (let h = 0; h < i; l += t, ++h) {
      const u = n.readUint16(l), m = (
        /** @type {import('./globals.js').FieldType} */
        n.readUint16(l + 2)
      ), b = this.bigTiff ? n.readUint64(l + 4) : n.readUint32(l + 4);
      let w = null, p = null, v = null;
      const C = Ke(m), k = l + (this.bigTiff ? 12 : 8), g = Xe[u]?.isArray, B = Xe[u]?.eager || this.eager;
      if (C * b <= (this.bigTiff ? 8 : 4))
        w = Ne(pe(m, b), _e(n, m), n, m, b, k, g);
      else {
        const S = n.readOffset(k), A = Ke(m) * b;
        if (n.covers(S, A))
          w = Ne(pe(m, b), _e(n, m), n, m, b, S, g);
        else if (B) {
          const E = await this.getSlice(S, A);
          w = Ne(pe(m, b), _e(E, m), E, m, b, S, g);
        } else g ? v = new p1(this.source, S, this.littleEndian, m, b) : p = async () => {
          const E = await this.getSlice(S, A);
          return Ne(pe(m, b), _e(E, m), E, m, b, S, g);
        };
      }
      w !== null ? o.set(u, w) : p !== null ? c.set(u, p) : v !== null && r.set(u, v);
    }
    const f = n.readOffset(a + s + t * i);
    return new _1(o, c, r, f);
  }
}
const g1 = at, y1 = Jn(tt), ne = {};
cs(ne, g1);
cs(ne, y1);
const M1 = z, je = 1e3, we = new Uint8Array(8), Y = {
  /** @type {Read} */
  nextZero: (e, a) => {
    let t = a;
    for (; e[t] !== 0; )
      t++;
    return t;
  },
  /** @type {Read} */
  readUshort: (e, a) => e[a] << 8 | e[a + 1],
  /** @type {Read} */
  readShort: (e, a) => {
    const t = Y.ui8;
    return t[0] = e[a + 1], t[1] = e[a + 0], Y.i16[0];
  },
  /** @type {Read} */
  readInt: (e, a) => {
    const t = Y.ui8;
    return t[0] = e[a + 3], t[1] = e[a + 2], t[2] = e[a + 1], t[3] = e[a + 0], Y.i32[0];
  },
  /** @type {Read} */
  readUint: (e, a) => {
    const t = Y.ui8;
    return t[0] = e[a + 3], t[1] = e[a + 2], t[2] = e[a + 1], t[3] = e[a + 0], Y.ui32[0];
  },
  /**
   * @param {Uint8Array} buff
   * @param {number} p
   * @param {Array<number>} l
   * @returns {string}
   */
  readASCII: (e, a, t) => t.map((s) => String.fromCharCode(e[a + s])).join(""),
  /** @type {Read} */
  readFloat: (e, a) => {
    const t = Y.ui8;
    return q(4, (s) => {
      t[s] = e[a + 3 - s];
    }), Y.fl32[0];
  },
  /** @type {Read} */
  readDouble: (e, a) => {
    const t = Y.ui8;
    return q(8, (s) => {
      t[s] = e[a + 7 - s];
    }), Y.fl64[0];
  },
  /**
   * @param {Uint8Array} buff
   * @param {number} p
   * @param {number} n
   */
  writeUshort: (e, a, t) => {
    e[a] = t >> 8 & 255, e[a + 1] = t & 255;
  },
  /**
   * @param {Uint8Array} buff
   * @param {number} p
   * @param {number} n
   */
  writeUint: (e, a, t) => {
    e[a] = t >> 24 & 255, e[a + 1] = t >> 16 & 255, e[a + 2] = t >> 8 & 255, e[a + 3] = t >> 0 & 255;
  },
  /**
   * @param {Uint8Array} buff
   * @param {number} p
   * @param {string} s
   */
  writeASCII: (e, a, t) => {
    q(t.length, (s) => {
      e[a + s] = t.charCodeAt(s);
    });
  },
  ui8: we,
  fl64: new Float64Array(we.buffer),
  fl32: new Float32Array(we.buffer),
  ui32: new Uint32Array(we.buffer),
  i32: new Int32Array(we.buffer),
  i16: new Int16Array(we.buffer),
  /**
    * @param {Uint8Array} buff
    * @param {number} p
    * @param {number} n
    */
  writeDouble: (e, a, t) => {
    Y.fl64[0] = t, q(8, (s) => {
      e[a + s] = Y.ui8[7 - s];
    });
  }
}, C1 = (e, a, t, s) => {
  let n = t;
  const i = (
    /** @type {Array<keyof fieldTagTypes>} */
    Object.keys(s).filter((o) => o != null && o !== "undefined").map(Number)
  );
  e.writeUshort(a, n, i.length), n += 2;
  let d = n + 12 * i.length + 4;
  for (const o of i) {
    const c = (
      /** @type {keyof typeName2byte} */
      is[o]
    ), r = M1[c];
    if (c == null || c === void 0 || typeof c > "u")
      throw new Error(`unknown type of tag: ${o}`);
    let l = s[o];
    if (l === void 0)
      throw new Error(`failed to get value for key ${o}`);
    c === "ASCII" && typeof l == "string" && rs(l, "\0") === !1 && (l += "\0");
    const f = l.length;
    e.writeUshort(a, n, o), n += 2, e.writeUshort(a, n, r), n += 2, e.writeUint(a, n, f), n += 4;
    let h = [-1, 1, 1, 2, 4, 8, 0, 0, 0, 0, 0, 0, 8][r] * f, u = n;
    h > 4 && (e.writeUint(a, n, d), u = d), c === "ASCII" ? e.writeASCII(a, u, l) : c === "SHORT" ? q(f, (m) => {
      e.writeUshort(a, u + 2 * m, l[m]);
    }) : c === "LONG" ? q(f, (m) => {
      e.writeUint(a, u + 4 * m, l[m]);
    }) : c === "RATIONAL" ? q(f, (m) => {
      e.writeUint(a, u + 8 * m, Math.round(l[m] * 1e4)), e.writeUint(a, u + 8 * m + 4, 1e4);
    }) : c === "DOUBLE" && q(f, (m) => {
      e.writeDouble(a, u + 8 * m, l[m]);
    }), h > 4 && (h += h & 1, d += h), n += 4;
  }
  return [n, d];
}, B1 = (e) => {
  const a = new Uint8Array(je);
  let t = 4;
  const s = Y;
  a[0] = 77, a[1] = 77, a[3] = 42;
  let n = 8;
  if (s.writeUint(a, t, n), t += 4, e.forEach((d, o) => {
    const c = C1(s, a, n, d);
    n = c[1], o < e.length - 1 && s.writeUint(a, c[0], n);
  }), a.slice)
    return a.slice(0, n).buffer;
  const i = new Uint8Array(n);
  for (let d = 0; d < n; d++)
    i[d] = a[d];
  return i.buffer;
}, k1 = (e, a, t, s) => {
  if (t == null)
    throw new Error(`you passed into encodeImage a width of type ${t}`);
  if (a == null)
    throw new Error(`you passed into encodeImage a width of type ${a}`);
  const n = {
    256: [a],
    // ImageWidth
    257: [t],
    // ImageLength
    273: [je],
    // strips offset
    278: [t],
    // RowsPerStrip
    305: "geotiff.js"
    // no array for ASCII(Z)
  };
  if (s)
    for (const l in s)
      s.hasOwnProperty(l) && (n[l] = s[
        /** @type {keyof GeotiffWriterMetadata} */
        l
      ]);
  const i = new Uint8Array(B1([n])), d = (
    /** @type {keyof typeMap} */
    e.constructor.name
  ), o = i1[d];
  let c = 8;
  o && (c = o.BYTES_PER_ELEMENT);
  const r = new Uint8Array(je + e.length * c);
  return q(i.length, (l) => {
    r[l] = i[l];
  }), Wn(e, (l, f) => {
    if (!o) {
      r[je + f] = l;
      return;
    }
    const h = new ArrayBuffer(c), u = new DataView(h);
    d === "Float64Array" ? u.setFloat64(0, l, !1) : d === "Float32Array" ? u.setFloat32(0, l, !1) : d === "Uint32Array" ? u.setUint32(0, l, !1) : d === "Uint16Array" ? u.setUint16(0, l, !1) : d === "Uint8Array" && u.setUint8(0, l);
    const m = new Uint8Array(u.buffer), b = je + f * c;
    for (let w = 0; w < c; w++)
      r[b + w] = m[w];
  }), r.buffer;
}, S1 = (e) => {
  const a = {};
  for (const t in e)
    t !== "StripOffsets" && (ne[t] || console.error(t, "not in name2code:", Object.keys(ne)), a[ne[t]] = e[t]);
  return a;
}, Ct = (e) => Array.isArray(e) ? (
  /** @type {T extends any[] ? T : T[]} */
  e
) : (
  /** @type {T extends any[] ? T : T[]} */
  [e]
), Ta = {
  Compression: 1,
  // no compression
  PlanarConfiguration: 1,
  ExtraSamples: 0
};
function E1(e, a) {
  const t = typeof e[0] == "number";
  let s, n, i, d;
  if (t) {
    const f = (
      /** @type {Array<number>} */
      e
    ), h = a.height || a.ImageLength;
    if (h === void 0 || typeof h != "number")
      throw new Error("height is required to be a number in metadata if data is a flat array");
    s = h;
    const u = a.width || a.ImageWidth;
    if (u === void 0 || typeof u != "number")
      throw new Error("width is required to be a number in metadata if data is a flat array");
    i = u, n = f.length / (s * i), d = f;
  } else {
    const f = (
      /** @type {Array<Array<Array<number>>>} */
      e
    );
    n = f.length, s = f[0].length, i = f[0][0].length, d = [], q(s, (h) => {
      q(i, (u) => {
        q(n, (m) => {
          d.push(f[m][h][u]);
        });
      });
    });
  }
  if (a.ImageLength = s, delete a.height, a.ImageWidth = i, delete a.width, !a.BitsPerSample) {
    let f = 8;
    ArrayBuffer.isView(d) && (f = 8 * Object.getPrototypeOf(d).BYTES_PER_ELEMENT), a.BitsPerSample = q(n, () => f);
  }
  const o = a;
  if ("Compression" in o || (o.Compression = Ta.Compression), "PlanarConfiguration" in o || (o.PlanarConfiguration = Ta.PlanarConfiguration), "ExtraSamples" in o || (o.ExtraSamples = Ta.ExtraSamples), !o.PhotometricInterpretation) {
    if (!Array.isArray(o.BitsPerSample))
      throw new Error("BitsPerSample must be an array when PhotometricInterpretation is not provided");
    o.PhotometricInterpretation = o.BitsPerSample.length === 3 ? 2 : 1;
  }
  if (o.SamplesPerPixel || (o.SamplesPerPixel = [n]), !o.StripByteCounts) {
    let f = 8;
    ArrayBuffer.isView(d) && (f = Object.getPrototypeOf(d).BYTES_PER_ELEMENT), o.StripByteCounts = [n * f * s * i];
  }
  if (!o.ModelPixelScale && !o.ModelTransformation && (o.ModelPixelScale = [360 / i, 180 / s, 0]), !o.SampleFormat) {
    let f = 1;
    t1(d) && (f = 3), s1(d) && (f = 2), n1(d) && (f = 1), o.SampleFormat = q(n, () => f);
  }
  !o.hasOwnProperty("GeographicTypeGeoKey") && !o.hasOwnProperty("ProjectedCSTypeGeoKey") && (o.GeographicTypeGeoKey = 4326, o.ModelTransformation || (o.ModelTiepoint = [0, 0, 0, -180, 90, 0]), o.GeogCitationGeoKey = "WGS 84", o.GTModelTypeGeoKey = 2);
  const c = Object.keys(o).filter((f) => rs(f, "GeoKey")).sort((f, h) => ne[f] - ne[h]);
  if (!o.GeoKeyDirectory) {
    let f = o.GeoAsciiParams || "";
    if (typeof f != "string")
      throw new Error("GeoAsciiParams must be a string if provided");
    let h = f.length;
    const u = o.GeoDoubleParams || [];
    if (!Array.isArray(u))
      throw new Error("GeoDoubleParams must be an array if provided");
    let m = u.length;
    const b = [1, 1, 0, 0];
    let w = 0;
    c.forEach((p) => {
      const v = ne[p], C = is[v], k = o[
        /** @type {keyof import('./geotiff.js').GeotiffWriterMetadata} */
        p
      ];
      if (k === void 0)
        return;
      let g, B, S;
      if (C === "SHORT") {
        if (g = 1, B = 0, typeof k != "number")
          throw new Error(`GeoKey ${p} with type SHORT must have a number value`);
        S = k;
      } else if (C === "ASCII") {
        if (o.GeoAsciiParams)
          return;
        {
          const A = `${k.toString()}\0`;
          B = Number(ne.GeoAsciiParams), S = h, g = A.length, f += A, h += A.length;
        }
      } else if (C === "DOUBLE") {
        if (o.GeoDoubleParams)
          return;
        {
          const A = Ct(k);
          B = Number(ne.GeoDoubleParams), S = m, g = A.length;
          for (const E of A)
            u.push(Number(E)), m++;
        }
      } else {
        console.warn(`[geotiff.js] couldn't get TIFFTagLocation for ${p}`);
        return;
      }
      b.push(v, B, g, S), w++;
    }), b[3] = w, o.GeoKeyDirectory = b, !o.GeoAsciiParams && f.length > 0 && (o.GeoAsciiParams = f), !o.GeoDoubleParams && u.length > 0 && (o.GeoDoubleParams = u);
  }
  for (const f of c)
    o.hasOwnProperty(f) && delete o[
      /** @type {keyof import('./geotiff.js').GeotiffWriterMetadata} */
      f
    ];
  [
    "Compression",
    "ExtraSamples",
    "GeographicTypeGeoKey",
    "GTModelTypeGeoKey",
    "GTRasterTypeGeoKey",
    "ImageLength",
    // synonym of ImageHeight
    "ImageWidth",
    "Orientation",
    "PhotometricInterpretation",
    "ProjectedCSTypeGeoKey",
    "PlanarConfiguration",
    "ResolutionUnit",
    "SamplesPerPixel",
    "XPosition",
    "YPosition",
    "RowsPerStrip"
  ].forEach((f) => {
    o[f] && (o[f] = Ct(o[f]));
  });
  const r = S1(o);
  return k1(d, i, s, r);
}
function Na(e, a, t, s) {
  let n = null, i = null;
  const d = Ke(a);
  switch (a) {
    case z.BYTE:
    case z.ASCII:
    case z.UNDEFINED:
      n = new Uint8Array(t), i = e.readUint8;
      break;
    case z.SBYTE:
      n = new Int8Array(t), i = e.readInt8;
      break;
    case z.SHORT:
      n = new Uint16Array(t), i = e.readUint16;
      break;
    case z.SSHORT:
      n = new Int16Array(t), i = e.readInt16;
      break;
    case z.LONG:
    case z.IFD:
      n = new Uint32Array(t), i = e.readUint32;
      break;
    case z.SLONG:
      n = new Int32Array(t), i = e.readInt32;
      break;
    case z.LONG8:
    case z.IFD8:
      n = new Array(t), i = e.readUint64;
      break;
    case z.SLONG8:
      n = new Array(t), i = e.readInt64;
      break;
    case z.RATIONAL:
      n = new Uint32Array(t * 2), i = e.readUint32;
      break;
    case z.SRATIONAL:
      n = new Int32Array(t * 2), i = e.readInt32;
      break;
    case z.FLOAT:
      n = new Float32Array(t), i = e.readFloat32;
      break;
    case z.DOUBLE:
      n = new Float64Array(t), i = e.readFloat64;
      break;
  }
  if (n === null || i === null)
    throw new RangeError(`Invalid field type: ${a}`);
  for (let o = 0; o < t; ++o)
    n[o] = i.call(e, s + o * d);
  return new TextDecoder("utf-8").decode(
    /** @type {Uint8Array} */
    n
  );
}
class ra extends Error {
  /**
   * @param {number} index
   */
  constructor(a) {
    super(`No image at index ${a}`), this.index = a;
  }
}
class A1 {
  /**
   * @param {number} [_index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(a = 0) {
    throw new Error("Not implemented");
  }
  /**
   * @returns {Promise<number>} the number of internal subfile images
   */
  async getImageCount() {
    throw new Error("Not implemented");
  }
  /**
   * @typedef {Object} ReadRastersWindowOptions
   * @property {number} [resX] desired Y resolution (world units per pixel)
   * @property {number} [resY] desired X resolution (world units per pixel)
   * @property {Array<number>} [bbox] the subset to read data from in
   *     geographical coordinates. Whole image if not specified.
   */
  /**
   * (experimental) Reads raster data from the best fitting image. This function uses
   * the image with the lowest resolution that is still a higher resolution than the
   * requested resolution.
   * When specified, the `bbox` option is translated to the `window` option and the
   * `resX` and `resY` to `width` and `height` respectively.
   * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
   * image is called and the result returned.
   * @see GeoTIFFImage.readRasters
   * @param {ReadRastersOptions & ReadRastersWindowOptions} options optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
   */
  async readRasters(a = {}) {
    const { window: t, width: s, height: n } = a;
    let { resX: i, resY: d, bbox: o } = a;
    const c = await this.getImage();
    let r = c;
    const l = await this.getImageCount(), f = c.getBoundingBox();
    if (t && o)
      throw new Error('Both "bbox" and "window" passed.');
    if (s || n) {
      if (t) {
        const [m, b] = c.getOrigin(), [w, p] = c.getResolution();
        o = [
          m + t[0] * w,
          b + t[1] * p,
          m + t[2] * w,
          b + t[3] * p
        ];
      }
      const u = o || f;
      if (s) {
        if (i)
          throw new Error("Both width and resX passed");
        i = (u[2] - u[0]) / s;
      }
      if (n) {
        if (d)
          throw new Error("Both width and resY passed");
        d = (u[3] - u[1]) / n;
      }
    }
    if (i || d) {
      const u = [];
      for (let m = 0; m < l; ++m) {
        const b = await this.getImage(m), w = b.fileDirectory.getValue("SubfileType"), p = b.fileDirectory.getValue("NewSubfileType");
        (m === 0 || w === 2 || (p || 0) & 1) && u.push(b);
      }
      u.sort((m, b) => m.getWidth() - b.getWidth());
      for (let m = 0; m < u.length; ++m) {
        const b = u[m], w = (f[2] - f[0]) / b.getWidth(), p = (f[3] - f[1]) / b.getHeight();
        if (r = b, i && i > w || d && d > p)
          break;
      }
    }
    let h = t;
    if (o) {
      const [u, m] = c.getOrigin(), [b, w] = r.getResolution(c);
      h = [
        Math.round((o[0] - u) / b),
        Math.round((o[1] - m) / w),
        Math.round((o[2] - u) / b),
        Math.round((o[3] - m) / w)
      ], h = [
        Math.min(h[0], h[2]),
        Math.min(h[1], h[3]),
        Math.max(h[0], h[2]),
        Math.max(h[1], h[3])
      ];
    }
    return r.readRasters({ ...a, window: h });
  }
}
class dt extends A1 {
  /**
   * @constructor
   * @param {BaseSource} source The datasource to read from.
   * @param {boolean} littleEndian Whether the image uses little endian.
   * @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the image
   *                                to the first IFD.
   * @param {GeoTIFFOptions} [options] further options.
   */
  constructor(a, t, s, n, i = {}) {
    super(), this.source = a, this.parser = new v1(a, t, s, !1), this.littleEndian = t, this.bigTiff = s, this.firstIFDOffset = n, this.cache = i.cache || !1, this.ifdRequests = [], this.ghostValues = null;
  }
  /**
   * @param {number} offset
   * @param {number} [size]
   * @returns {Promise<DataSlice>}
   */
  async getSlice(a, t) {
    const s = this.bigTiff ? 4048 : 1024;
    return new pa((await this.source.fetch([{
      offset: a,
      length: typeof t < "u" ? t : s
    }]))[0], a, this.littleEndian, this.bigTiff);
  }
  /**
   * @param {number} index
   * @return {Promise<import('./imagefiledirectory.js').ImageFileDirectory>}
   */
  async requestIFD(a) {
    if (this.ifdRequests[a])
      return this.ifdRequests[a];
    if (a === 0)
      return this.ifdRequests[a] = this.parser.parseFileDirectoryAt(this.firstIFDOffset), this.ifdRequests[a];
    if (!this.ifdRequests[a - 1])
      try {
        this.ifdRequests[a - 1] = this.requestIFD(a - 1);
      } catch (t) {
        throw t instanceof ra ? new ra(a) : t;
      }
    return this.ifdRequests[a] = (async () => {
      const t = this.ifdRequests[a - 1];
      if (!t)
        throw new Error("Previous IFD request missing");
      const s = await t;
      if (s.nextIFDByteOffset === 0)
        throw new ra(a);
      return this.parser.parseFileDirectoryAt(s.nextIFDByteOffset);
    })(), this.ifdRequests[a];
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(a = 0) {
    return new Vn(await this.requestIFD(a), this.littleEndian, this.cache, this.source);
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  async getImageCount() {
    let a = 0, t = !0;
    for (; t; )
      try {
        await this.requestIFD(a), ++a;
      } catch (s) {
        if (s instanceof ra)
          t = !1;
        else
          throw s;
      }
    return a;
  }
  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Record<string, unknown>|null>} the parsed ghost area or null, if no such area was found
   */
  async getGhostValues() {
    const a = this.bigTiff ? 16 : 8;
    if (this.ghostValues !== null)
      return this.ghostValues;
    const t = "GDAL_STRUCTURAL_METADATA_SIZE=", s = t.length + 100;
    let n = await this.getSlice(a, s);
    if (t === Na(n, z.ASCII, t.length, a)) {
      const d = Na(n, z.ASCII, s, a).split(`
`)[0], o = Number(d.split("=")[1].split(" ")[0]) + d.length;
      o > s && (n = await this.getSlice(a, o));
      const c = Na(n, z.ASCII, o, a), r = {};
      c.split(`
`).filter((l) => l.length > 0).map((l) => l.split("=")).forEach(([l, f]) => {
        r[l] = f;
      }), this.ghostValues = r;
    }
    return this.ghostValues;
  }
  /**
   * Parse a (Geo)TIFF file from the given source.
   *
   * @param {BaseSource} source The source of data to parse from.
   * @param {GeoTIFFOptions} [options] Additional options.
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   */
  static async fromSource(a, t, s) {
    const n = (await a.fetch([{ offset: 0, length: 1024 }], s))[0], i = new Hn(n), d = i.getUint16(0, !1);
    let o;
    if (d === 18761)
      o = !0;
    else if (d === 19789)
      o = !1;
    else
      throw new TypeError("Invalid byte order value.");
    const c = i.getUint16(2, o);
    let r;
    if (c === 42)
      r = !1;
    else if (c === 43) {
      if (r = !0, i.getUint16(4, o) !== 8)
        throw new Error("Unsupported offset byte-size.");
    } else
      throw new TypeError("Invalid magic number.");
    const l = r ? i.getUint64(8, o) : i.getUint32(4, o);
    return new dt(a, o, r, l, t);
  }
  /**
   * Closes the underlying file buffer
   * N.B. After the GeoTIFF has been completely processed it needs
   * to be closed but only if it has been constructed from a file.
   */
  close() {
    return typeof this.source.close == "function" ? this.source.close() : !1;
  }
}
async function P1(e, a = {}, t) {
  return dt.fromSource(z1(e, a), void 0, t);
}
function G1(e, a) {
  return E1(e, a);
}
var x1 = /* @__PURE__ */ JSON.parse('[{"id":"AS21","bounds":[171.8256487,-34.3559317,172.090076,-34.0291036],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AS21.json","itemChecksum":"1220e057a0578a5802d98490921b5dad7be3eca2459bcc13698f1b0ae902aff12673","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AS21.tiff","checksum":"122019bb924956d5c0c2f5da0aed0e43d761a79e5683bbb91e632356394dbd7cff75"},{"id":"AS22","bounds":[172.0865823,-34.3576007,172.3500367,-34.031302],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AS22.json","itemChecksum":"1220daf21448f9473bb74d73ae6dd8e24b98cbd7216e9998fc4e24df8540c93330f5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AS22.tiff","checksum":"1220dcc8062bf03288e74a124fbb58d09848c2ad11aed6344368b1178c3a8090f795"},{"id":"AT24","bounds":[172.6069956,-34.6839226,172.8695046,-34.3587136],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AT24.json","itemChecksum":"12203aad4fbd9643034462e019cc6c1898e3cb04168d6651fb923910c2b1603a6323","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AT24.tiff","checksum":"1220d2e460fd9ed6c8d38c1fc82704e9735d649442021520004f54443968bfd5adb5"},{"id":"AT25","bounds":[172.8689973,-34.6839226,173.1310027,-34.35927],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AT25.json","itemChecksum":"12204de4afb67a8e117adb967b2da57189a5f111d795ddc6e73171550484a6efa753","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AT25.tiff","checksum":"12202c197d50e95c97e77c0fb865c8b9158e5add97ff57fedbec16a785dce2a5d0f8"},{"id":"AU25","bounds":[172.8684819,-35.0085579,173.1315181,-34.6839226],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU25.json","itemChecksum":"12201a6191becea8852bf2b2e104d5655ce658ceff4c2c9fd55d1c662c6b9b3ea02f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU25.tiff","checksum":"1220c0c2b8b8a9fc78ed850bbd133d3bd86ffbc8f80df0c7c56e6c1898c732238fa1"},{"id":"AU26","bounds":[173.1310027,-35.0085579,173.3945507,-34.6833594],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU26.json","itemChecksum":"1220bfc3baa7e3af531ed573ff5dbda852b72b02dca53f8221b0e8548fa6913f5d9e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU26.tiff","checksum":"1220b98cfd59bddea8dc7e0ef911e24afdc488d7cb6f30ba0e0a1f038124399e5b44"},{"id":"AU27","bounds":[173.3930044,-35.0079879,173.6575721,-34.6822331],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU27.json","itemChecksum":"12205a8a96628ae0597a34bc35c110f09e0245b5c434444a54c748228e67413d34fa","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU27.tiff","checksum":"12200c88b67f12a58a90a982a39b328338978d90cd7247e09f2cd03ce8d1bf38067e"},{"id":"AU28","bounds":[173.6549952,-35.006848,173.9205751,-34.6805438],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU28.json","itemChecksum":"122048ff4c4b329d2da59e33b222fca3b05b3921255071378c501822ad7d817886e0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU28.tiff","checksum":"122078808eca70635c2fdea2ef3a9abef21fba2b260f1391af4d413d670fe15eae3f"},{"id":"AU29","bounds":[173.9169678,-35.0051382,174.1835523,-34.6782915],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU29.json","itemChecksum":"122000027bec20c5a120d6d1dad95081be85ea3b349397b400570ecbdbe4c8bcbbf5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AU29.tiff","checksum":"1220d4806d3e2e7b4910c50fe3898ed43a105d76db9353ec3286a48d1fb948e87d41"},{"id":"AV25","bounds":[172.8679581,-35.3331757,173.1320419,-35.0085579],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV25.json","itemChecksum":"122062e8b849432f7ca15dbb06c3c65042308766817ab081ea6352d8a8000b2adff0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV25.tiff","checksum":"122041f6336ad70e0699c138363819089798da7a0e033e59c36a497f80c5a6b2a5db"},{"id":"AV26","bounds":[173.1315181,-35.3331757,173.3961219,-35.0079879],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV26.json","itemChecksum":"122075e0380b80efbe821f205a371603c815d2d5044cdf7206cacf37a4ac6ca61f0a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV26.tiff","checksum":"1220daba9516cf1545df08ddfee92f27bc42b0a588611992f84739d5ba867ac28a17"},{"id":"AV27","bounds":[173.3945507,-35.3325989,173.6601906,-35.006848],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV27.json","itemChecksum":"1220e767086ed70dd872278a80330dd96ec4112de8ded2ef54fb6f5c5f139acbfe3b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV27.tiff","checksum":"1220be4db33a76ebe814b210838c38bb32cf1bd580469f376c805e65d0e892e3f4c2"},{"id":"AV28","bounds":[173.6575721,-35.3314452,173.9242406,-35.0051382],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV28.json","itemChecksum":"1220db5dfdbccd2aa988cd0417436d1516c80831ad0a84715d9862cde3abbf55ede4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV28.tiff","checksum":"1220a91b92994b24a82576cca35a72880214cbbfec7585d82c72131c992cd9639c2d"},{"id":"AV29","bounds":[173.9205751,-35.3297149,174.1882644,-35.0028588],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV29.json","itemChecksum":"12209e34918f8a060e7213349f7db63a8d875b103a2b438fd761a7ba226181152d7b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV29.tiff","checksum":"12200a4805752c14bb421c4e089a8c82a2aeb106670021b0b8e6aefefb3b45e5aace"},{"id":"AV30","bounds":[174.1835523,-35.3274081,174.4522544,-35.0000099],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV30.json","itemChecksum":"122022b0883c134fece5b645f322fb2a74883ae0044bc8b8158a866d4c77658cbd0c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AV30.tiff","checksum":"1220fa06e28f6f1d78822bd81a609910dd9178a869c00184f875ff3b2345470bbf8b"},{"id":"AW26","bounds":[173.1320419,-35.6577761,173.3977184,-35.3325989],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW26.json","itemChecksum":"122029c17819719815b614eba41fed3de802d502e8473991f68b34dc25c3b0f192bb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW26.tiff","checksum":"1220dc5955c915dda64f764035449d8fd2eda0d0f99f1ed4c6d38ae81c2cc132281b"},{"id":"AW27","bounds":[173.3961219,-35.6571924,173.6628513,-35.3314452],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW27.json","itemChecksum":"122071508ad785d6ceb1efb87e6eb61131874b11ea61ae8c52004d7bc8972ef1b36b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW27.tiff","checksum":"1220df89a44bf424ca7f7201d1cbe49d7b8e7186baeadec41185d6f43c240b85cdcb"},{"id":"AW28","bounds":[173.6601906,-35.6560249,173.9279652,-35.3297149],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW28.json","itemChecksum":"12209b25171e0d11f80e40e789b868581db7d2762745b14f8fb2fbd16a4686bcacb3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW28.tiff","checksum":"1220e2bfb5d3fbb8518c9e4248eb92c8e50b551f0b338fe789a67d82b65e3f55682c"},{"id":"AW29","bounds":[173.9242406,-35.6542739,174.1930523,-35.3274081],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW29.json","itemChecksum":"12208d3993b5a855d5b5df5ed55a3bf44a64d6fbb9f30557c1e7fdf2ecf0ba5fbc87","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW29.tiff","checksum":"12206852bc270f4740df95e5af9aa6af4d3e3559a49ac38f8d50dea0d8d2c1b3159d"},{"id":"AW30","bounds":[174.1882644,-35.6519394,174.4581052,-35.3245249],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW30.json","itemChecksum":"12208c569221860735a7e9859c29e7d9d089d1688e2ad71742f9966f79c69f078aa5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW30.tiff","checksum":"12203e56a4b8cc4f61494368775162344e18df5bbd85468f392e2d6a0c9be5e35c6c"},{"id":"AW31","bounds":[174.4522544,-35.6490217,174.7231162,-35.3210657],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW31.json","itemChecksum":"1220f2bb61288286daaf78e44e3fa17f6071c1fd017db0750cd431bb1ca0497433a7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW31.tiff","checksum":"122079a14e5d9e00e8c3c330405b449a98e891fe63a1ee0fdd240d141e6eb8d48406"},{"id":"AW32","bounds":[174.7162031,-35.645521,174.9880777,-35.3170308],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW32.json","itemChecksum":"12208084ebbd794c3770a71740fe6db38a83adf8e763fdcde5320396ba974e66efbc","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AW32.tiff","checksum":"1220d3386773a217736fb92328404838de2964e68d096f15791f605fb3ca69d3e270"},{"id":"AX27","bounds":[173.3977184,-35.9817683,173.6655549,-35.6560249],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX27.json","itemChecksum":"12206261753ef3fa56f0421ad2f5f378239d81a9280ddcb84ccdefd2f4d072984962","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX27.tiff","checksum":"1220020390f6f0fd7b4b378cae3d4adcf7249eeeb81cbbc859e3a002d56756e89d30"},{"id":"AX28","bounds":[173.6628513,-35.9805869,173.9317497,-35.6542739],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX28.json","itemChecksum":"122064409a86a0e4f7e96eab2aca52edf106b6c3217222c0a97998c427bf47998230","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX28.tiff","checksum":"1220fb4854f6ff496edea97520e0da8e50b3b27f041aeb337ecdad318f6463389d04"},{"id":"AX29","bounds":[173.9279652,-35.9788149,174.1979175,-35.6519394],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX29.json","itemChecksum":"1220407cde4df3b9ce0f278c1dea78f4090d802073bd858fa61a59a34e76ab68d785","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX29.tiff","checksum":"1220cced17c281ee397905fc569f40349b465de51de35484b461f74173b8907035ad"},{"id":"AX30","bounds":[174.1930523,-35.9764526,174.4640503,-35.6490217],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX30.json","itemChecksum":"12203422421160f263b5df62d2cd828e7168363f77d0ed6e69efe47151dcfcd39dba","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX30.tiff","checksum":"122035d82f6c3a2f538e36fee20b26e787a57eea5bc6db0511b4d29f6bc0e6f80554"},{"id":"AX31","bounds":[174.4581052,-35.9735,174.7301406,-35.645521],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX31.json","itemChecksum":"12208b36001db586592981f1ff10bdfa66ffe4b300d6a5cc583fe04efb7656211fb9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX31.tiff","checksum":"12206d630dd2f089146be8f6e3da5f76686bcbc49116afd035badaa607a57a127f92"},{"id":"AX32","bounds":[174.7231162,-35.9699576,174.9961806,-35.6414377],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX32.json","itemChecksum":"122096d5f2b77ebd9d6861f5bf9bcd132ac830fac48ead498b4f21147bce471b9980","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AX32.tiff","checksum":"122076e02ea25a38fb099611867fe91dce58caf3faf0b23060cca5f87e76b25684ce"},{"id":"AY28","bounds":[173.6655549,-36.3051311,173.9355953,-35.9788149],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY28.json","itemChecksum":"1220971de6003e16a247e72208276bdbf00a95d55a498015b900abfe5cccc78b2364","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY28.tiff","checksum":"1220834871f1ed1746c517e098332cc37c641c058ecf0e31a8e8e527652dd08601cc"},{"id":"AY29","bounds":[173.9317497,-36.303338,174.202861,-35.9764526],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY29.json","itemChecksum":"122057b7bcdb80fa0f4a774825f7dc05d74030f45f5849d99d20dc4923516b2be727","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY29.tiff","checksum":"122071bbfc237c4b3f3a8121657d3b112a784c80e0e367f5ffc780542dd199d5bfb6"},{"id":"AY30","bounds":[174.1979175,-36.3009476,174.4700913,-35.9735],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY30.json","itemChecksum":"122029245cdd14b494882da36907e06035389823a8c175c7b3d9c1f662e55ff1ecfd","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY30.tiff","checksum":"1220f8f4305bf5a292920ae5f5a1aeca80aaa332f187822da60e98be279bdccf4643"},{"id":"AY31","bounds":[174.4640503,-36.29796,174.7372783,-35.9699576],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY31.json","itemChecksum":"1220fe1c0c36047bdcba7d6be4437ee05a33821e06556fa40c2eed59668ff179cddb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY31.tiff","checksum":"12204f427fb1ad3cb7ba3fdfecfcb032f1506346770073f1e83d501bd7e4d88f6ba6"},{"id":"AY32","bounds":[174.7301406,-36.2943754,175.0044142,-35.9658256],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY32.json","itemChecksum":"12209c5ef01461c7dc4a11c45097ae7c2201715d9aa70b81a2ffebad41ee86e3827f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY32.tiff","checksum":"1220f3756e8561af4ed0c7c31383796bf0204bffeceb701df68111994c52e2fec0ea"},{"id":"AY33","bounds":[174.9961806,-36.2901943,175.2714911,-35.9611044],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY33.json","itemChecksum":"122066d45ff06e00a0eb1415029dd4de930481ddbe9ba0cadfee0a504f33d33022d6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY33.tiff","checksum":"1220b958d04da9e2767dc400b99d112aee0b15b8b9547e120936bde15101cd0174b4"},{"id":"AY34","bounds":[175.2621626,-36.285417,175.5385011,-35.9557945],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY34.json","itemChecksum":"122087e444b33973e5ac3bf84b756fb41895e562de9d3b3eb36381350c82d3c76231","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AY34.tiff","checksum":"122064e5db2e01b5a48fe474a245ca7285ffe11c361c7597598fa7013fe39445cac4"},{"id":"AZ29","bounds":[173.9355953,-36.6278431,174.2078843,-36.3009476],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ29.json","itemChecksum":"1220876207d2f3bac96ceb230e5f80d2b3d94c4cbe55abd6ecef4034d0a33b68c541","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ29.tiff","checksum":"12202658a6206b675c835f79fbba7955e5a5332542707bf0a4a17512ddb62c2b22e3"},{"id":"AZ30","bounds":[174.202861,-36.6254244,174.4762296,-36.29796],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ30.json","itemChecksum":"12203513eda6a1661b292f63b2ff29fad671e0bbde29e58ac44709a452487983a279","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ30.tiff","checksum":"122035d60ff0df8b819daf8950b542f4b61db4a34d6021a38756254e544bdbf8c607"},{"id":"AZ31","bounds":[174.4700913,-36.6224014,174.744531,-36.2943754],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ31.json","itemChecksum":"12209a96ce9e79e3446fbbde4c26c106715b46b45f3de3d318b96b520da337b3b673","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ31.tiff","checksum":"12203625d0a017eeac9f20b7312f1926ca3622f621a4cdc39a4a61a13ab81bb9ed77"},{"id":"AZ32","bounds":[174.7372783,-36.6187744,175.0127803,-36.2901943],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ32.json","itemChecksum":"12202e97372f19c2093f0377f246e2bf1a8d6905eb5c339d6f7d6c2eee3a065b47b8","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ32.tiff","checksum":"1220a2ca4b95bb3e438c60fdd8201a7312fb940f6b808f88e060b0799d16637a3a02"},{"id":"AZ34","bounds":[175.2714911,-36.6097099,175.5490913,-36.2800439],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ34.json","itemChecksum":"1220ad6405169408625ab302cd12abaad29836ac5fdbe5abc23f967140cd9558623c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ34.tiff","checksum":"1220aa826757f3c581ca1cd853e7579aadb3671b4909d63f428705b9c4c0d063200b"},{"id":"AZ35","bounds":[175.5385011,-36.6042732,175.817137,-36.2740756],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ35.json","itemChecksum":"1220cd2cdc6ed504625909b05eb07279cabb89ddc257528aec006171d2bc97a0ee00","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/AZ35.tiff","checksum":"12207175d44f411ea23a55a8d4ecf46edfb3dbb3dc0e124943b9c886a2aeb956d689"},{"id":"BA30","bounds":[174.2078843,-36.9498829,174.4824669,-36.6224014],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA30.json","itemChecksum":"122078c6b8863e29ce3cd7daf08d93e0730fb98a90ef87f76c8cca680ef4a17ad1d0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA30.tiff","checksum":"1220aa64883b4196eb31581fae20e2d4695e9db890a9d3093194d20569b978278fdc"},{"id":"BA31","bounds":[174.4762296,-36.9468242,174.7519006,-36.6187744],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA31.json","itemChecksum":"122093fa89b693716c153a8d3ace63d5eee3605486cb2c846ddb06f1183d96213776","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA31.tiff","checksum":"1220c1a264b8d6eb7f693263776eb7fa05dc1418884e682a57149bf556b4cfd83fa8"},{"id":"BA32","bounds":[174.744531,-36.9431544,175.0212814,-36.6145437],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA32.json","itemChecksum":"1220fcd78ff114025d9405d23a20ff4120a30d7332aa9381439becd7f0da5b32f27e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA32.tiff","checksum":"12203c69c37279be6fd15b101d5e59bef559551b08d365835f8d2bb848e13e6f13cf"},{"id":"BA33","bounds":[175.0127803,-36.9388738,175.2906013,-36.6097099],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA33.json","itemChecksum":"1220a155674ccc86cc3878f15278be944d40a701f39517c652ff0f1134df42329ca0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA33.tiff","checksum":"122003e0cb33edbb19a255157d5c3c516edbe3555b3013d7cf99cf950a035457dedc"},{"id":"BA34","bounds":[175.2809698,-36.9339829,175.5598522,-36.6042732],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA34.json","itemChecksum":"1220c3f1b6ffd25a99ae2f70558a28b0477b4978f5989144417f09c31b2b2b6b8cf4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA34.tiff","checksum":"12203e2afb01db38a03616b21a24a58c2a483ee5ec7988a991df5cc1ec62715d5dc4"},{"id":"BA35","bounds":[175.5490913,-36.9284821,175.8290259,-36.5982342],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA35.json","itemChecksum":"1220e0aded029b8db1c22a27771d30316a677b5af1089d17cdee9291316e760cff0f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA35.tiff","checksum":"1220bffbfc651174d9c4770f050b56922c669f9d056142979e3d34bfa424bd610148"},{"id":"BA36","bounds":[175.817137,-36.9223719,176.0981144,-36.5915936],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA36.json","itemChecksum":"1220e36e0229ad179c5ec57e0e9f416264cd3f89626fa468985c1f2e0a0a75716ff3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BA36.tiff","checksum":"122027f2d5a6fc32ca4c4bbec4608645e92d5d0f21651256876ade03c3d69ff5c971"},{"id":"BB30","bounds":[174.2129885,-37.2743229,174.4888049,-36.9468242],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB30.json","itemChecksum":"12204675664c05d4b588f4d51b582a42fad6795a2742c27f07ba756ee2b905a379a3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB30.tiff","checksum":"12207d5701926a61e3fba4e545b792451ceaeef07d412f6b225949212f95282af484"},{"id":"BB31","bounds":[174.4824669,-37.2712283,174.7593892,-36.9431544],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB31.json","itemChecksum":"1220dcd70eeeeecd139c84d01e23379aae3390ffe2338f60b4b3620c417b044908af","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB31.tiff","checksum":"122051f1f9bc614ea812189a9ff563831e2dead9cfa8b75570465c23ded581cd81d8"},{"id":"BB32","bounds":[174.7519006,-37.2675153,175.0299197,-36.9388738],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB32.json","itemChecksum":"12205c7c261e5d53971a7a5166cf5f50d51a3e2bae844cb6c167f5b6bcdaf631454a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB32.tiff","checksum":"122098995039add08cd211af6d22d03e1835a075f2a1d1b4059339f56acf0acd2f7b"},{"id":"BB33","bounds":[175.0212814,-37.2631844,175.3003882,-36.9339829],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB33.json","itemChecksum":"12204f45057362e15fb39ec7de18857507c7c59fd6192bd95e296b794d49d9c065e4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB33.tiff","checksum":"12205bf56cd2d687c9456b61d82e6ebe71952d0b0ac50e92c71e899f3c3d04848ef6"},{"id":"BB34","bounds":[175.2906013,-37.258236,175.5707865,-36.9284821],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB34.json","itemChecksum":"12205ed35bf2f8719f88e0cff047c08202d8a31922bc91335c057029265d5d55c27d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB34.tiff","checksum":"12206f44f60a0ce169e83b53874102cc938231e4cb06f8559ddc69a991589267e380"},{"id":"BB35","bounds":[175.5598522,-37.2526705,175.8411064,-36.9223719],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB35.json","itemChecksum":"1220126fea5dbb92a00029bda23b504a084245e1ea04408aa87696fc3028b42146df","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB35.tiff","checksum":"12207055e7f94658bbe564a7aa1a504f6ecc9155e8dc989601aad81e6ffcf0fe65e6"},{"id":"BB36","bounds":[175.8290259,-37.2464884,176.1113397,-36.9156529],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB36.json","itemChecksum":"1220da8f8709fb7705bd648a876ee9809a0e08e6cd76d8f7b9c015472eb85aa3d9f0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB36.tiff","checksum":"1220a3ac4eb51b63b1543b8b1dd8fb9440011280e130411685600b6fd08567d60af7"},{"id":"BB37","bounds":[176.0981144,-37.2396905,176.3814782,-36.9083257],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB37.json","itemChecksum":"1220018a101352cd51fe8653ed77b534db079affdc1f2026019740c6cdf5448170ad","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BB37.tiff","checksum":"12207b8e6ae06443c55ecdcc521e9c7224ba2541f0329e6435da15e77ded8a0ba08c"},{"id":"BC31","bounds":[174.4888049,-37.5956136,174.7669986,-37.2675153],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC31.json","itemChecksum":"1220505b0388286eb094aebd5eec6c0f7369f6d174fbf934ceca2e7f9ac011fb6f21","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC31.tiff","checksum":"122091d2fbc8f39cdbc99dbc0e1ccff6e26bd0c4249bc6a4c8e7264ea866196fa254"},{"id":"BC32","bounds":[174.7593892,-37.5918571,175.0386974,-37.2631844],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC32.json","itemChecksum":"12204c00acdcb97613a3d8599f6349c1845131b756c9ee763285c03e02e876a03387","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC32.tiff","checksum":"12200700f016ce34242c8531ea4e6f7a57d66f0d97901c2e5bc828ac02d548b364cb"},{"id":"BC33","bounds":[175.0299197,-37.5874754,175.3103331,-37.258236],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC33.json","itemChecksum":"12200f0eea465cb433ee619f9a60212553a007b867866f5a859b9c7f6e4fa89ba505","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC33.tiff","checksum":"1220bd964f2231b68b150cbc89c0051a14310b6b53e6f0f3200bb46f3334d0a3befc"},{"id":"BC34","bounds":[175.3003882,-37.582469,175.5818974,-37.2526705],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC34.json","itemChecksum":"12209c5840eb0c1d9f783af6e9a74f8b2c896c37b967b424f71e899b0881f561f7eb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC34.tiff","checksum":"12206c1405298ddd49b23b0757726eabc2e269db6fa6ebc0514fd98a4bef4f0ef814"},{"id":"BC35","bounds":[175.5707865,-37.5768383,175.8533819,-37.2464884],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC35.json","itemChecksum":"1220ee5d74efce258b930ab48b432f70eca00946d16a4db96bc025956cc11d8f1ea3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC35.tiff","checksum":"122091917726594992e893912b0a49e0526d8ea29f6a1e90895d7901a99f2313131c"},{"id":"BC36","bounds":[175.8411064,-37.5705838,176.1247783,-37.2396905],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC36.json","itemChecksum":"12200a74c8ef473930f82a86b2b015d851a4d4a80caf408697e182e0f2977aae026f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC36.tiff","checksum":"122080b02141c3041f2f6aac9c0baee73d93708059d10fb85ec57daf6fbfd8b964a4"},{"id":"BC37","bounds":[176.1113397,-37.5637062,176.3960784,-37.2322772],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC37.json","itemChecksum":"12204631a55174e491d260b6fa6b602b6a41c2a2a80cb7360f03c36c9e5c073256d5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC37.tiff","checksum":"1220eb41de05bf1a757f7fca32394e4a182192504b2fc45f0a8c150b7584a379d0fc"},{"id":"BC40","bounds":[176.9214381,-37.5393413,177.209317,-37.2063529],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC40.json","itemChecksum":"122078c9b7d144810bc0b354d56d38410e21b7e85e93b0a5d093fcf81b2206566bae","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BC40.tiff","checksum":"1220fae3bdc8365b3a64ce8a2807aaf63ed43b1e3fda7411f56e003135191dc9b705"},{"id":"BD31","bounds":[174.4952452,-37.9199801,174.7747311,-37.5918571],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD31.json","itemChecksum":"1220b9b2c084af78780ddcffd14c948cea9a0033445fad8c976b1640dc08d4d409ca","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD31.tiff","checksum":"1220e31d7859de7016ed5cbd32487d5dfc82674dba2c2a8f71cb84d5ea5d758e704b"},{"id":"BD32","bounds":[174.7669986,-37.9161797,175.0476169,-37.5874754],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD32.json","itemChecksum":"12200d8b46a9b334417ef8857700bc19c6b9191b94905bd341732c1ba2ebdefac145","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD32.tiff","checksum":"1220f12f96e21eb8493a17a245f0fb1ffd44bbfae036a81dba953809d3d104785117"},{"id":"BD33","bounds":[175.0386974,-37.9117469,175.3204386,-37.582469],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD33.json","itemChecksum":"1220541bcd4a7d9647e66fc83ab693f94e865fe87876d4cb7cdf112cceb52fc816dd","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD33.tiff","checksum":"122048f3e62a3649f479b6da4e03baaa7a8fab2094d79d6fa2536ac361bf4aade91b"},{"id":"BD34","bounds":[175.3103331,-37.9066819,175.5931877,-37.5768383],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD34.json","itemChecksum":"12209d4d5c0fb45c4487120c24203385c670eb1b33e23074b114cc59ce29d7e56eb2","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD34.tiff","checksum":"1220dbe2e905456a3d4a67639bef73854f57cc8b8e91a15a4d57e7c5ffd4ef46986b"},{"id":"BD35","bounds":[175.5818974,-37.9009854,175.8658556,-37.5705838],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD35.json","itemChecksum":"1220972f533d731ebe5d02e9d74195fac4c696e25cfe737442e5918414a770313208","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD35.tiff","checksum":"12201d834c3168e0914b402d5274733cbf071a65d97bf3cfc55a18917a8a6669e132"},{"id":"BD36","bounds":[175.8533819,-37.8946579,176.1384339,-37.5637062],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD36.json","itemChecksum":"122051ded38ef2dfc40ae7e9779b4e646bfec025bf310535ddea4c93a014a1dc174b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD36.tiff","checksum":"122031031231071b0e2f224dbabcf21ad201dc7535a878484ca3e56bb3e894543d91"},{"id":"BD37","bounds":[176.1247783,-37.8876999,176.4109142,-37.5562061],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD37.json","itemChecksum":"122075c47d2271e525521ff7a06ae7f7eb08ab956151ee79d6654e92d051c2b96663","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD37.tiff","checksum":"1220467ceeb22e588ef86941d4624b51469bfb421778b98e8f3b59d319b53cd06b62"},{"id":"BD38","bounds":[176.3960784,-37.8801123,176.683288,-37.5480842],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD38.json","itemChecksum":"12203928333083f4d6e86d822c11dbbff21b89c26b149ec01e2be0da78dbf517a5c1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD38.tiff","checksum":"122093065ea5816699c918a289bbdb52bec9111af677150eb58bc1346cbb7de9960a"},{"id":"BD39","bounds":[176.6672737,-37.8718956,176.9555468,-37.5393413],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD39.json","itemChecksum":"1220835919f23f43c91dd2c54077b51566f41dfc475870a1051e2a6f05fbf5aa4086","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD39.tiff","checksum":"1220a11bd518d1444de5397a9e5f88eae95b9dc64730023b4e98007ac17a4d7dab0a"},{"id":"BD40","bounds":[176.938356,-37.8630506,177.2276822,-37.5299783],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD40.json","itemChecksum":"12205017c1d4370d72632672d3f003c7cc1f690f2ad60cfd0b4aa1b80dc889a2b3f3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD40.tiff","checksum":"1220444303c41e604872710f448e288407a26b852295281c3487628c5386eba76245"},{"id":"BD42","bounds":[177.4801486,-37.8434795,177.7715497,-37.5093952],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD42.json","itemChecksum":"1220c0030b15917758a661e5ee7e75e719ae7d2a65586f42c496a4ea5404903297d6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD42.tiff","checksum":"1220a3f9dd07ecd50ad2bdc6cda26b030881eb8baff7b57f3f8eaade0817feada2e5"},{"id":"BD43","bounds":[177.7508424,-37.8327552,178.043265,-37.4981772],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD43.json","itemChecksum":"1220b93d08c7768e7a5b668d77cf30a73b948769b24b1407d0e1155279dcb1f06f35","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD43.tiff","checksum":"1220bbdf9f26bd8337cf7c5bdc3654cfa085934358acf5e7f657597a63069b085bda"},{"id":"BD44","bounds":[178.0213904,-37.8214063,178.3148237,-37.4863429],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD44.json","itemChecksum":"1220151aaadd496499dda506ac097fdbc5e943f7b97a6b0d9ce1bf572b1e67be0efe","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD44.tiff","checksum":"122071997f56732e83ded5b0cab916c5ebf90d1e5802a0a047e0820bcccfa64ed2c2"},{"id":"BD45","bounds":[178.2917842,-37.8094341,178.5862173,-37.4738934],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD45.json","itemChecksum":"122061a32d336ef01d6f687f6e6dafc7c6f4b09b507cbeae06a5a709af8cff6b50df","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD45.tiff","checksum":"1220e244362c1ac57832afaa3e6134f0d27b9fe68d9b1cdb9926dfb78969f4882730"},{"id":"BD46","bounds":[178.5620159,-37.7968396,178.8574378,-37.46083],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD46.json","itemChecksum":"12200f94ab0052b6ee131cd705dc0776628502af34b00b68582525a2116cd87143ec","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BD46.tiff","checksum":"1220749dab57e16498fd60291a6e82e5311b0ac364927c79f320c048b28ade6c90a5"},{"id":"BE31","bounds":[174.5017897,-38.2443278,174.7825886,-37.9161797],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE31.json","itemChecksum":"1220909439c6cfa2e8de2eed9fb4ecf280535fa6d3a5c38f1407aa7a58ae62b0722d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE31.tiff","checksum":"1220dbc7b110843395aa0e5a0f8bf2edfe95aa198aeb6a297c95c22624ae33e9c84a"},{"id":"BE32","bounds":[174.7747311,-38.2404831,175.0566807,-37.9117469],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE32.json","itemChecksum":"1220a67445c32182d5b514bf18f87be009d02d367b6ebb0ed18a2c45e52c882ca17f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE32.tiff","checksum":"1220e00795b07785d61c2b2a43123627b97c56038068d8f392314bdc2bb71c7de3f6"},{"id":"BE33","bounds":[175.0476169,-38.2359985,175.3307075,-37.9066819],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE33.json","itemChecksum":"12200a3ef8baac0e173ab674003fdf67bdb2e58d8279976c708a249181b55724bead","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE33.tiff","checksum":"122037dbe17dc5f4f6b274783bfa6b17d6e08cac90124c52cca031a84cbc2d63ab19"},{"id":"BE34","bounds":[175.3204386,-38.2308746,175.6046605,-37.9009854],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE34.json","itemChecksum":"12200032279c14e7b16f915665e067d27b79be8ba2491d9c097a0bd161f14c8af6bd","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE34.tiff","checksum":"1220cf84f518f6bfc8b6dce16600516197d413c1cbd48479598c30559db3032ec537"},{"id":"BE35","bounds":[175.5931877,-38.2251117,175.8785309,-37.8946579],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE35.json","itemChecksum":"122067f2cbd063b7e7b85f3db36bc0c7e432b0e2d3cb0882a81a5df50db5cf9699e5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE35.tiff","checksum":"1220493d9dea5ab6cd8629641323a8e17f296819f8abdaf48b6a706794eb4411084a"},{"id":"BE36","bounds":[175.8658556,-38.2187105,176.1523102,-37.8876999],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE36.json","itemChecksum":"1220f10aae8957a22a192c815caeb6a9ed9030c70b2fee1622a8357d9e6921a0a9e5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE36.tiff","checksum":"12209ba1b4c838fa5530cc27278e0271004a4263ddfd1b373dc8a0d95076f2713661"},{"id":"BE37","bounds":[176.1384339,-38.2116715,176.4259897,-37.8801123],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE37.json","itemChecksum":"122064f6a728c011e90173bf02ce821d029cdb4a6bc444e259cc03d973f559f44935","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE37.tiff","checksum":"1220b56c9935790a18a7dead8b10a7487e4293b0ecbe4b1219a663d2d2d1b64254d8"},{"id":"BE38","bounds":[176.4109142,-38.2039955,176.6995608,-37.8718956],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE38.json","itemChecksum":"1220092679b91765f4730ab3b5ac28587307934b93919661a79a8b779899e2516858","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE38.tiff","checksum":"1220cc88abd77c44f7a75a46fb2848ad171fa60890a00b5bfc92f6481b8be4fb43d5"},{"id":"BE39","bounds":[176.683288,-38.1956832,176.9730151,-37.8630506],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE39.json","itemChecksum":"12208dd35cd095423ce99bd92c9113ae7db1a1fdcfc92567c9a4e470f107494e4e0d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE39.tiff","checksum":"1220dfd53fd3b09c87488b3b50b9f0f28cdb03f0e29d8a631eec7b2e2f3412489439"},{"id":"BE40","bounds":[176.9555468,-38.1867353,177.2463438,-37.8535783],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE40.json","itemChecksum":"1220bb7c6bf13e79e6caaa5cc5fa88b37e31e72145a2d1f81cdbe5768803c5b19e2a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE40.tiff","checksum":"1220d4a09929faaa79eadb21d8030c50300c1d7361764c5ea194ee1b423a59edc971"},{"id":"BE41","bounds":[177.2276822,-38.1771528,177.5195386,-37.8434795],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE41.json","itemChecksum":"1220b1739d291dc017ce849a611b24be263c7f6c1607b5df4f861cd0aa9073af4867","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE41.tiff","checksum":"122031482aae5d108d8736109ac55b0452014bf6a54060e3d3df31e00aad5cc5094d"},{"id":"BE42","bounds":[177.499686,-38.1669365,177.7925909,-37.8327552],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE42.json","itemChecksum":"12204f7ca6d3f37ed4c58ee3b01f0dd2024391d4805e88e771c7e4baac48321a5011","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE42.tiff","checksum":"12201733b26e23684f048fc3f499b5aa7084dc7c914fb9b804d7708357f80893a798"},{"id":"BE43","bounds":[177.7715497,-38.1560875,178.0654923,-37.8214063],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE43.json","itemChecksum":"1220d3a6b032f60a695378afa253499dac139f0dda913dead670c562f93f4d0909e7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE43.tiff","checksum":"1220817a5e6ce69421b1e14aab2a7b33a0476ca6bec57cc0fb45f2078ea70eb94116"},{"id":"BE44","bounds":[178.043265,-38.1446067,178.3382342,-37.8094341],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE44.json","itemChecksum":"12204b3adb3c5773d2b2c1f6e4da085be913c4cf6e906ce3ca97e72f0865ab14e37e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE44.tiff","checksum":"122060db89859264111f2d7b3df2cdf377ffcb79fa7bf654073f059bed8821014e5b"},{"id":"BE45","bounds":[178.3148237,-38.1324954,178.6108084,-37.7968396],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE45.json","itemChecksum":"1220671b8f782b76659126f5331a290212609f6822d5c7e0fce929289f7a93cce54a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BE45.tiff","checksum":"1220556d6ae894517a9d6011eeed437f02a571242fcc44cae45d8d508f4e97fa6ce5"},{"id":"BF31","bounds":[174.50844,-38.5686564,174.7905734,-38.2404831],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF31.json","itemChecksum":"1220ec542205e1df9a5ab93f91d8fe065e2fcc2ff89a57a74069c8cc8cf4840426ef","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF31.tiff","checksum":"122001289aea49346ed65f27713d068b70507f4fec4edff6eb8bb21145b9f90e4037"},{"id":"BF32","bounds":[174.7825886,-38.5647671,175.0658913,-38.2359985],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF32.json","itemChecksum":"1220b66c0d338a1673fb1e139752923cf20b23599a8cb9f6724759d7ff67f3a2650d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF32.tiff","checksum":"1220eec3c4cb621c7633e488a4dc02b2293c1da2f8b0c96520bcfc57ac19bbfb2056"},{"id":"BF33","bounds":[175.0566807,-38.5602304,175.3411427,-38.2308746],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF33.json","itemChecksum":"1220d5e0d803b438c2fce4d5daeef20f1e594b553955e0e148c73861f2f492fb9940","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF33.tiff","checksum":"12203d737712187b042914327b34d7110ffa757471a688ce97951e71697f3afc4eb1"},{"id":"BF34","bounds":[175.3307075,-38.5550469,175.616319,-38.2251117],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF34.json","itemChecksum":"1220e08f743f5b37d63a7b1508a37af16b9e134c30d58df55f033438cb38c1cede2e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF34.tiff","checksum":"1220b9cd4ca11f33d7beb3ebdef74e3e815a43fcbd1e83ae29468f211ea8bd18c16a"},{"id":"BF35","bounds":[175.6046605,-38.5492171,175.8914113,-38.2187105],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF35.json","itemChecksum":"12200769eb14209dbcd45add97a1c28ae12be44357897d1f464e4b5310f7c2f85544","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF35.tiff","checksum":"1220683798db727d56c1da6eefa341b40d6575da1e10a5e24bd2261f3f1417eba45c"},{"id":"BF36","bounds":[175.8785309,-38.5427416,176.1664109,-38.2116715],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF36.json","itemChecksum":"1220631b913fb1fd4ea8a4e24844ddb204ff2d117324bfa1677b90c5e45d5f8a61fe","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF36.tiff","checksum":"1220c43c3cb6ee83e14030f753b9b4eb062b1c69c52ff286e2c2e83385040678fd6c"},{"id":"BF37","bounds":[176.1523102,-38.5356209,176.441309,-38.2039955],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF37.json","itemChecksum":"1220c7727647b884e3fa48ab51f0d372df54bb36887085dbe7d6cf752112d7d004b7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF37.tiff","checksum":"1220d76f6481f6387f4fc1de59ebdcc1bda90cd8668f3a0174b5826dacb85b6a9503"},{"id":"BF38","bounds":[176.4259897,-38.5278557,176.7160968,-38.1956832],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF38.json","itemChecksum":"1220f541f40df0118fe08c181e19255b0c0646f311d0a7730b3e171c0a6854b41440","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF38.tiff","checksum":"1220f1b4c72993f9ef0488e34d580cb4913d03906afbd11d6a3b486f65bc7f9a61c0"},{"id":"BF39","bounds":[176.6995608,-38.5194469,176.9907657,-38.1867353],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF39.json","itemChecksum":"1220f00ce62e36393b0553b8dd4aa6344fdbf3c5da4d5a1c48ab20dd1a1cc90e5485","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF39.tiff","checksum":"1220b1c9f85b89e8337ab3e918b0c8040a929c5e892e4fa949e19a4294ad0054b783"},{"id":"BF40","bounds":[176.9730151,-38.5103952,177.2653069,-38.1771528],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF40.json","itemChecksum":"122004978134fe3abd4e287736bb539f2a86684ef4662fa965ff56863a8ccf578686","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF40.tiff","checksum":"1220701339aa9d6d9518ffd89124168bbc41f5303f73cf7ed52d6fbcd8ae63047b55"},{"id":"BF41","bounds":[177.2463438,-38.5007015,177.5397118,-38.1669365],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF41.json","itemChecksum":"122075cae00a678b2d48a3175d896b7c67d9d4db6fd66572c85c5209b89a2ab9bc8a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF41.tiff","checksum":"122029c8cde4a843391d7f430a2341c4071f7ac0491bd7a197ff8135c18d7a9c72e9"},{"id":"BF42","bounds":[177.5195386,-38.4903668,177.8139717,-38.1560875],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF42.json","itemChecksum":"122058d768eb7eb2a977b2b591cbc0c39fdf9d03f8395e0cca98d290f7823d909261","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF42.tiff","checksum":"12205f31d0d6f26f8072c38676fd1c412b88e993c3829e2edec7f3b17acd0732ae88"},{"id":"BF43","bounds":[177.7925909,-38.4793919,178.0880781,-38.1446067],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF43.json","itemChecksum":"1220bfa7a27add90bc572c0a36ba96db476d94e1b10f2c6e0468bded2b9ab6c96c36","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF43.tiff","checksum":"122013c08be579cb50864e9a21548310472b93af3fde9217f0e93b1b3c019baba3a2"},{"id":"BF44","bounds":[178.0654923,-38.4677781,178.3620224,-38.1324954],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF44.json","itemChecksum":"1220437ae26cf3ce9b3e1a85c60d7c60d6a4533fa1c12d0fd30204b4c1e4518d4fc3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF44.tiff","checksum":"1220bf5c664f00a9c22c897766abd0124b458fbeac5017e266045da4887a86d8cca5"},{"id":"BF45","bounds":[178.3382342,-38.4555264,178.6357959,-38.1197545],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF45.json","itemChecksum":"122011cd25756db96848c693515d507f7360674113a00df179f790eb3a097ce80699","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BF45.tiff","checksum":"1220b20d65ed78e19103243071f831956c838bba90b024729b90eafc677eebb94a9b"},{"id":"BG30","bounds":[174.239774,-38.8962453,174.5220657,-38.5686564],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG30.json","itemChecksum":"1220e780b63a41fa2f6ca610708f275897c4aca68ec6cd9e038d0e75d1696f21011c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG30.tiff","checksum":"12209fdc21de0c1e44a03cad0405d4ecccf14fbde5036b334cf5032256a496f7190e"},{"id":"BG31","bounds":[174.5151981,-38.892966,174.7986877,-38.5647671],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG31.json","itemChecksum":"12203c7ec647d5cf0a2bbe8df6b62a0ddd40a10b9d20e6f85b79c8b26bacd255d5c4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG31.tiff","checksum":"1220ad2d613dad7806cbe1dd0a8e27f21713b492229b093f4387d5468a663c57252b"},{"id":"BG32","bounds":[174.7905734,-38.8890316,175.0752512,-38.5602304],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG32.json","itemChecksum":"12203bb5d50e1683b3c2e032c868bf09d6775e32f42c32edcb970a36a3ff8c5423e7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG32.tiff","checksum":"12200cb09ddc7838deac6381393ff39b5283ed1bbc380221b6741f9758b077486498"},{"id":"BG33","bounds":[175.0658913,-38.8844424,175.3517471,-38.5550469],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG33.json","itemChecksum":"1220cee0c5712ca8db3f3eff7f09cc91e7033d49ba55f385a37fde401f7fe99f62e9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG33.tiff","checksum":"12202b5f391a645fa28652aff447798b3b0e2a8479c8732f536ec2873ee3e5707725"},{"id":"BG34","bounds":[175.3411427,-38.8791989,175.6281665,-38.5492171],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG34.json","itemChecksum":"1220aca127e36cb27d09ca8eba98c3029488e6ac4b133a8bc6a70c7abf2122425429","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG34.tiff","checksum":"12208e6300da0d7f6f7b08b5425b21f44c3a59c9bf9774690c2367f5319e6c8058b2"},{"id":"BG35","bounds":[175.616319,-38.8733015,175.9045005,-38.5427416],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG35.json","itemChecksum":"1220740a199ff050139d3844eedfdbda8bab6787a3a59da72f6731a22e8b1be71ee5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG35.tiff","checksum":"1220827686bf219118e4f1ac2f0ca53546821d8713384731148b429b109baab40d9e"},{"id":"BG36","bounds":[175.8914113,-38.866751,176.1807401,-38.5356209],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG36.json","itemChecksum":"12207dd37169d8639933ebf9705ac4bef6ebb643d4712cf2ac01f5c708c776dcae4b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG36.tiff","checksum":"122051112df63adb09f0fde0feee13a20f182fc33fbef94734c6724578de2eff654a"},{"id":"BG37","bounds":[176.1664109,-38.8595478,176.4568763,-38.5278557],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG37.json","itemChecksum":"122002bbb53b65382d53e96d52d0e3dd2fcfb6a5b82025bb8aa87c0627cc76c60e90","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG37.tiff","checksum":"1220004bbcfbb64fdaf1b6f34f2c9ed1e030bef54193ad170ca2e2aec3099be1bff0"},{"id":"BG38","bounds":[176.441309,-38.8516928,176.7329005,-38.5194469],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG38.json","itemChecksum":"12204828008ded73968634abf1a4b38e2b2f5f84d9e5f3ec30f7123b816ef09faf12","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG38.tiff","checksum":"1220b3fd2868cf212924d67b584741bfef5460b659a7015b4af421db368174bbaa58"},{"id":"BG39","bounds":[176.7160968,-38.8431866,177.0088035,-38.5103952],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG39.json","itemChecksum":"12204f712323e49913ee5642e0f9d032ddf0aed96aee8fb77eeb794222da952277f1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG39.tiff","checksum":"1220ac6f7db7faa98d70c9e1e44d51d8c66bb9d64668407ccd10dbeec8f0ee9a71bd"},{"id":"BG40","bounds":[176.9907657,-38.8340302,177.2845767,-38.5007015],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG40.json","itemChecksum":"12208e39d81e86a02223cdf485227e31d2d3beea8f798f230b186a57ccb03eb23ea1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG40.tiff","checksum":"1220fa4a7d8b74fa7e4fe6addeae687d3d515ef7c05d8df422a5f062484100fa2e2d"},{"id":"BG41","bounds":[177.2653069,-38.8242243,177.5602111,-38.4903668],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG41.json","itemChecksum":"1220c0fff333d692ed74195d2e8b8f958b203adead2cda912b8c28cf9fc6e434aed2","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG41.tiff","checksum":"1220e06637e508d29ee4ea6ff44283145b39d202239d99d4ac5e462c8ac8bc27b971"},{"id":"BG42","bounds":[177.5397118,-38.81377,177.8356981,-38.4793919],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG42.json","itemChecksum":"12201a1217f6640de988a007eb140a2ce96757fc8b53f9f50ad319b2c357dae55f35","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG42.tiff","checksum":"12202c4860ab743c28d381742339dea8d46aae8bcdf790892c68e0499e7f2ed8db0a"},{"id":"BG43","bounds":[177.8139717,-38.8026683,178.1110288,-38.4677781],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG43.json","itemChecksum":"12202942c4767d45801b2da94cffbc48fbe2bee4f043880c287f1da92a66597b765b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG43.tiff","checksum":"12202289121761fd81cee30f6489de51c65dee575c5806845f8420435d11bb96668d"},{"id":"BG44","bounds":[178.0880781,-38.7909202,178.3861945,-38.4555264],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG44.json","itemChecksum":"1220c87390f1d60cc2a314b5f0604e9170a5301b7a7eb5e40d8ab019172f7373fec1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BG44.tiff","checksum":"1220b219790b4ae5f802c65cd3881dd876575295d549d6c7b8ba555bac5aa4132703"},{"id":"BH28","bounds":[173.6919382,-39.2252188,173.973125,-38.8988692],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH28.json","itemChecksum":"1220869cfff62fe810ed3c98bc8354b3d1bb35c7bf6fee6e57abc3473ce9b6e21438","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH28.tiff","checksum":"1220ff8e6c9ff0debb164989afddc6bb960ae4c1085a28ff0da83df95b018de7e4ce"},{"id":"BH29","bounds":[173.968682,-39.2232279,174.2511056,-38.8962453],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH29.json","itemChecksum":"1220e8f384bbd8c2eb3b9bb8c0592fe852babf8a3799719160c798137226ad500cc6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH29.tiff","checksum":"1220d0797feea4532d524fbb819062c33126b2b5748b529c76b47cc042099ccbc4ca"},{"id":"BH30","bounds":[174.2453941,-39.2205738,174.5290449,-38.892966],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH30.json","itemChecksum":"1220ba6afb33ddfee45c1788f622f571041d4611b323e03cca933ed7d19de945d454","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH30.tiff","checksum":"12204436ab156b1d3364350cf69798ea234faf1f15c735c414f15cc140d9dc004d16"},{"id":"BH31","bounds":[174.5220657,-39.2172566,174.8069338,-38.8890316],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH31.json","itemChecksum":"12208fbf531f1e8c8ffcf657b5caf31f14affe360a984c6bfb1af7a4f74e52edc7e5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH31.tiff","checksum":"1220746dd67e69736e39c455bb46d53b9327d630014659dce0e297e57e069ec002cd"},{"id":"BH32","bounds":[174.7986877,-39.2132766,175.0847631,-38.8844424],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH32.json","itemChecksum":"12207fe7451c899e4569b6435757e36c55e233d15d970d11870b58ea6528ae02c451","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH32.tiff","checksum":"122044c9f66b22a7aabf7e1dfb16143e90f2844d1846da45915b0c889d0d0fc8667c"},{"id":"BH33","bounds":[175.0752512,-39.2086344,175.3625236,-38.8791989],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH33.json","itemChecksum":"122072fa9d29fd87913685f560bbfc000c4e3d84ddeefef54cd28c80b9aa6cf36fbc","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH33.tiff","checksum":"122072c0b3b58e50df04512a30ca943160c078cadd5e0c86db6d832ce77d6c14820a"},{"id":"BH34","bounds":[175.3517471,-39.2033303,175.6402063,-38.8733015],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH34.json","itemChecksum":"12200b87f33686b9b62cae2db2a2a3481dd87ac18a2f2b586106a7ba141c444ccaeb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH34.tiff","checksum":"122086dee71380a04da7918585075cb730793e0d38015e367bccd43d36658e9d8631"},{"id":"BH35","bounds":[175.6281665,-39.1973648,175.917802,-38.866751],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH35.json","itemChecksum":"1220c75f4cc61477e03cd4d9df413633b7baea0c10f81303b46ba4b0acb99acf6dd7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH35.tiff","checksum":"1220fbf09ac4d1881d46ca4db64631c631b48c8c1de358f54d70950b8d120c2c7aa1"},{"id":"BH36","bounds":[175.9045005,-39.1907385,176.1953016,-38.8595478],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH36.json","itemChecksum":"1220a815cd7a7f5cb88ba6fc37bea67a4b4be64befc6eab115103cc7db5aeea7af76","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH36.tiff","checksum":"122074f110e3cb584c0d6122ae8aea53d97c358d2fe29bfe3b280fb7bec31cecd900"},{"id":"BH37","bounds":[176.1807401,-39.1834522,176.4726961,-38.8516928],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH37.json","itemChecksum":"1220c0badf001fe588bf38769bdfba94cbf3ed1930cfc59c696aaf72f72a509d35ad","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH37.tiff","checksum":"1220c3ed50236393977146d44c99cde954b7cd8494700c9d65de997075b5006e2bfb"},{"id":"BH38","bounds":[176.4568763,-39.1755064,176.7499765,-38.8431866],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH38.json","itemChecksum":"12204d35bfb54978e0f74e734bffaf529ffed3ff30c8e92e6d73ecd917b89d0be08e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH38.tiff","checksum":"1220e539d6b39b2601c336459064fa5919fd425672386ceab94b5298dcf5b6dfae83"},{"id":"BH39","bounds":[176.7329005,-39.1669021,177.0271336,-38.8340302],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH39.json","itemChecksum":"1220bf973a56581d3ceea0aaf769a43a5a0ece161b98977c7964125163a3825fddc0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH39.tiff","checksum":"1220e89adb76c5636672164791b029c4cf0f9e600067956bddcbd6a1362831681844"},{"id":"BH40","bounds":[177.0088035,-39.1576399,177.3041586,-38.8242243],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH40.json","itemChecksum":"1220a8408b04e3c2a85ca0673c4dd8c0fd9cf67a6b4b8bd43517eca7e8ee347f3b81","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH40.tiff","checksum":"1220f4a0c767d1b855fb07eecf5d7bec0a21819cc69fcada870544fce9893f1c6c10"},{"id":"BH41","bounds":[177.2845767,-39.1477209,177.5810424,-38.81377],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH41.json","itemChecksum":"122071f55548a5fb3c75890e2ed19d39c5e22c1c561b7a4ca753cde1174e70d07e78","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH41.tiff","checksum":"1220ee9d00a7f4fdf836112047ae87095291aef0a8dceba6efc59fff1c2c0cb3478b"},{"id":"BH42","bounds":[177.5602111,-39.1371461,177.8577761,-38.8026683],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH42.json","itemChecksum":"1220a6acc29d2cf49bcf9fc2eb5f6860a0ba597ce8b827493e5de4aa7892a56a3f2e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH42.tiff","checksum":"1220cff6cec0e08d995cce816db461207d220eaf7b082d8a63f39c71ea9738cab0a0"},{"id":"BH43","bounds":[177.8356981,-39.1259163,178.1343507,-38.7909202],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH43.json","itemChecksum":"1220476680cf565f1df1ea36ca18a15c953f68f61ce21548d33b733639f6df40384f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BH43.tiff","checksum":"12204b5348c6fc60b8082cfb0f6699b6f4f61ae13d89ec647ac82311e5735748070c"},{"id":"BJ28","bounds":[173.6951122,-39.549582,173.9776403,-39.2232279],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ28.json","itemChecksum":"12203a066a1b0dcf4cdb28979d53f9e345067fa55a0a47cbf1e7a7ef470cf8aa29a4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ28.tiff","checksum":"12200aae21bd5c8bae1c4d5bb09c475d2fd008fae08fe842219dc3e09fdb38bc087b"},{"id":"BJ29","bounds":[173.973125,-39.5475681,174.25691,-39.2205738],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ29.json","itemChecksum":"122055b1e4d09197624328d84da3702a9e020f8632c878be0681f223396393cf0262","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ29.tiff","checksum":"12202f7d37778d5e64d493d8e366c190544c7c3d9751f4529da341a4edd1536be8a9"},{"id":"BJ30","bounds":[174.2511056,-39.5448834,174.5361377,-39.2172566],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ30.json","itemChecksum":"1220288221158d7a22932e36261b646fbf9431622bc336a27865d6cb445b2ccdb72e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ30.tiff","checksum":"12204207081a26f07b69cd28e93552f90e3f69012ecf56c8aeae4814333bc2277c95"},{"id":"BJ31","bounds":[174.5290449,-39.5415279,174.815314,-39.2132766],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ31.json","itemChecksum":"12203326a989190789320ec44dd887be89ac2509694a6fa05f49cf76a7a33c143a96","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ31.tiff","checksum":"1220e3b7fe948e37ca6b168c1d02b5718ee1ee15653e821464778a37ceef905185b1"},{"id":"BJ32","bounds":[174.8069338,-39.5375021,175.0944296,-39.2086344],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ32.json","itemChecksum":"1220ad94ce12527787bba9af1c30293e46b8ae9b004ef4b9f9f392baff6528646ea9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ32.tiff","checksum":"1220744bce5f8a73fe4f99da35aa7ea6805846cb746bd4bda0656cc9e9b902325561"},{"id":"BJ33","bounds":[175.0847631,-39.5328063,175.3734753,-39.2033303],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ33.json","itemChecksum":"12204844098d563309e2b7c8bd9ff63237d116be8e9ab4643c2c2263d95fb3b6a7f7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ33.tiff","checksum":"1220d9630a07ce1cef2f56117e80b2bbf043e09b1ae225d78ef1627ea58de9af2042"},{"id":"BJ34","bounds":[175.3625236,-39.527441,175.6524417,-39.1973648],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ34.json","itemChecksum":"12204c0ab59ade999630adc7c6604ac8a62a3d9fd8e23995f3068fac92bc480a306e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ34.tiff","checksum":"1220223a8700905a6f3aef76867c2105fc7305838b6fbe1f425b2551cd9cca400325"},{"id":"BJ35","bounds":[175.6402063,-39.5214068,175.9313196,-39.1907385],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ35.json","itemChecksum":"1220de3bc3ba122b01013217a07f3bf62cd325bb2d47934db28dd55b4a85d5028ba7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ35.tiff","checksum":"12203e74692c2b839de42a2629136bea12fe7d9297062d563210de27766fbfec4e57"},{"id":"BJ36","bounds":[175.917802,-39.5147042,176.2100997,-39.1834522],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ36.json","itemChecksum":"1220729fa088bf692b47996cc0e8b431b897abd06c4a56aadb5c3a12eb22d4f8ed12","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ36.tiff","checksum":"1220e5b8732e7e4bacd9ea5facd8ebd2154833faaa261ff9516b3405d0102208f7a5"},{"id":"BJ37","bounds":[176.1953016,-39.5073339,176.4887728,-39.1755064],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ37.json","itemChecksum":"1220130d7dbd66076f973df20c7af06b746467e7e0c7f99eae99c540e8a36cf6ba8b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ37.tiff","checksum":"122005f71dbe1d5a706d46371f4c5ac20b8ddda9ccfbaf4796f7008ee5cee358188f"},{"id":"BJ38","bounds":[176.4726961,-39.4992966,176.7673297,-39.1669021],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ38.json","itemChecksum":"122038dd62bcc9448d6c6e3a28573fa570813514aac387e76702d2130de0f7c02af5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ38.tiff","checksum":"12205ec6e740b4b506f75f50a71356699fb0c17ff70a624c2716f24cf166bee66628"},{"id":"BJ39","bounds":[176.7499765,-39.4905932,177.0457612,-39.1576399],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ39.json","itemChecksum":"1220b8c72d58b061d2eb50ba75f4ec741733544ef23e98ea57379c4ac21b5958fc08","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ39.tiff","checksum":"1220bcd0eb0cb7acf354bec939847c04c544d321cd8e5e44b165abc47336771901da"},{"id":"BJ40","bounds":[177.0271336,-39.4812244,177.3240581,-39.1477209],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ40.json","itemChecksum":"122097a2ef98e6d03fc706253d1ccdfe0c6d560aaac72f553c6b178aae6710af32c0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ40.tiff","checksum":"12200505e3bbd473d723276963bbf31d06e2dfa516dec3934eea76c2dcec60ba1bd7"},{"id":"BJ42","bounds":[177.5810424,-39.4604946,177.8802118,-39.1259163],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ42.json","itemChecksum":"1220c15a02cd7117f02f46e287991f439f097e8463a3378e8a7d829e120173a44ec9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ42.tiff","checksum":"12202c0b1063d7d07b42d8659932a53aaf8af690e6c6248e7a039a88e7d158776f7e"},{"id":"BJ43","bounds":[177.8577761,-39.4491357,178.1580505,-39.1140328],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ43.json","itemChecksum":"12208759bf7ed35b4001fce90e27af0079f4d5b4aa4b52d00cfd4e7f2d89a3415364","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BJ43.tiff","checksum":"12202d66b1fb5503b6a53fa9014abbd6404aaa2b53f1623fdbfef1c77c5316589482"},{"id":"BK28","bounds":[173.6983378,-39.8739268,173.9822291,-39.5475681],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK28.json","itemChecksum":"12206fcbd267bc9cd1a4ac193a3077f046eb1288dcec1a37196c8c6914b531561b74","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK28.tiff","checksum":"12204b3476a5e5c3647df6559c883f7b34a504f33ded65949d4a86da9a2ba13058f5"},{"id":"BK29","bounds":[173.9776403,-39.8718898,174.2628089,-39.5448834],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK29.json","itemChecksum":"12205b1f9cae9aec9f70b9457c70d2b8b0d7ba801ab5433808d2376ed20511f6d22d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK29.tiff","checksum":"122026edbf6fecde3253c54c7664abedc98c8648c5700664464468952bb3a754342e"},{"id":"BK30","bounds":[174.25691,-39.8691741,174.543346,-39.5415279],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK30.json","itemChecksum":"1220dde6e06fdf8defa10b3e17050d0eba3561071c1f7e31e238fdf0b0425d002133","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK30.tiff","checksum":"122023ff501d47da7acc6986b24bc19dceb4877c2db0dba19d9c5e3ad93737b39b3e"},{"id":"BK31","bounds":[174.5361377,-39.86578,174.8238307,-39.5375021],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK31.json","itemChecksum":"1220d2ad6a70c64660ba62882d43fec5aae3d6f210945640b0489f050d82aa48b9d9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK31.tiff","checksum":"1220c4ff05c0b08a36bab769a08bdf4c327ab7d49bc32c4bbb787984ee7602d77936"},{"id":"BK32","bounds":[174.815314,-39.8617079,175.1042536,-39.5328063],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK32.json","itemChecksum":"1220da38ff0b546ad525970f5bec5751af823121ccaf50dc39467be69932684edaac","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK32.tiff","checksum":"1220b1c60045b799a05d657ec6e236b0bbd3bc4dd1b6ab71677d6f7905db9a012748"},{"id":"BK33","bounds":[175.0944296,-39.8569581,175.3846053,-39.527441],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK33.json","itemChecksum":"122040520972b0dd36b0039cce487b536733bc6e487720c6e52551c6e1d9de1e5719","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK33.tiff","checksum":"122070e50854f8395678fc742a37118211614a43951d6855e642b835e9e9bdf4e64e"},{"id":"BK34","bounds":[175.3734753,-39.8515311,175.6648763,-39.5214068],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK34.json","itemChecksum":"12201633fc48c6d8d755d3577b04aaca487ee4055b9b623b81cf3b22e894e4e36c02","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK34.tiff","checksum":"12206e699625af6080e22ec38539b8d6485c341ff2cb6b586a03c1a4ed5d5f9b9fa7"},{"id":"BK35","bounds":[175.6524417,-39.8454275,175.9450572,-39.5147042],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK35.json","itemChecksum":"1220be86ecfb7f784bc4105d6669407bddc3fc568d131a8e3f76158c98ff3360de35","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK35.tiff","checksum":"1220e3229fc801d1ea0dcf5d31c8d215ef4d09411da3b35fd8abc8ec3e17033134a5"},{"id":"BK36","bounds":[175.9313196,-39.8386478,176.2251386,-39.5073339],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK36.json","itemChecksum":"1220ed73774138cabc91d30f4d78b53c99d9b7a89e3ff9ca9bef46597d7939bc97ed","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK36.tiff","checksum":"1220e971aeb264757645e8928fdfe9d877df520e341c7ebbee581f5c60f0dd447448"},{"id":"BK37","bounds":[176.2100997,-39.8311928,176.505111,-39.4992966],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK37.json","itemChecksum":"1220dce8f4ce7386461178f3f7b38a441914a8a322997278b61c750cf755fe070d3d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK37.tiff","checksum":"1220728f01fb77b24f3f473ae0f99c93f09c6e0a9b16e18d8e409f70b25d23afc6c6"},{"id":"BK38","bounds":[176.4887728,-39.8230631,176.7849651,-39.4905932],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK38.json","itemChecksum":"1220ceb7f1a876aa0bdf024ed297ee89b4fc7d90d7164c94b0932b348bf41996587a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK38.tiff","checksum":"1220ab4642af5c2246c9165fd7460baf97751d4a0e71662476fb0bfc2a6346b9f60f"},{"id":"BK39","bounds":[176.7673297,-39.8142597,177.0646915,-39.4812244],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK39.json","itemChecksum":"1220762a30815efc40698c94570f84dcceebb4ba5ba69a5023ec5fdd81369d70bdca","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK39.tiff","checksum":"12209ff6d8d3c1b1213f76e57746a5ce0361b0f393b642d1f129e7972d52c6e8b7af"},{"id":"BK40","bounds":[177.0457612,-39.8047833,177.344281,-39.4711912],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK40.json","itemChecksum":"122057c10a090a68e5d14b27103422daa143c7c3b9f7bd066fbb590efc602265f0b1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BK40.tiff","checksum":"1220442d98b0a85fa37427765a897293c8652486304164bc6e45428016fa25c827ef"},{"id":"BL31","bounds":[174.543346,-40.1900129,174.8324864,-39.8617079],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL31.json","itemChecksum":"1220e6390dc9f2434a229af717e227b24c3968915c38ed04c617b3d914cd09df2297","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL31.tiff","checksum":"1220287fd88f6c67515b3c72ab0652377e193b840a3ad887ba32183d779d69cfcd62"},{"id":"BL32","bounds":[174.8238307,-40.185894,175.1142379,-39.8569581],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL32.json","itemChecksum":"1220af552cd4c909d683b21e3d470c65942cee25a85bac014840f1738091bc455c3a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL32.tiff","checksum":"1220af787e1f967d32f2acbf20eea801fee8fa43b9309e600bedf7ffe1fc9604e4ea"},{"id":"BL33","bounds":[175.1042536,-40.1810897,175.3959169,-39.8515311],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL33.json","itemChecksum":"12207eea334c14dda1bfcbb43b5817927a1717dc2dbd35744441e5b31469388f3ba4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL33.tiff","checksum":"12203a5fc909ab7f2a4f9ce7f9d0a15ab1c2877cf89fc80092b48406a74c234a2408"},{"id":"BL34","bounds":[175.3846053,-40.1756004,175.6775138,-39.8454275],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL34.json","itemChecksum":"1220c6e76ec2e4e0951069ce51658bd184b1955351c580a7096dde7d3a781ce1e23b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL34.tiff","checksum":"1220c6bac405cdd57e7bd207c7ce1f7fcecf817f57035bf894ae4b264262557db94b"},{"id":"BL35","bounds":[175.6648763,-40.1694267,175.9590189,-39.8386478],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL35.json","itemChecksum":"1220400425d02c791123d85e1ebf027fa3686e4a3d6b938e1c9fcb1b984fdd14fe11","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL35.tiff","checksum":"1220832858e5288b5caa8ae17aa7f63889cfd410aaf0eee3e50f87377ddc826544bf"},{"id":"BL36","bounds":[175.9450572,-40.1625693,176.2404226,-39.8311928],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL36.json","itemChecksum":"1220866256ee23752b5d677ac1041e409c483ecf1d1f050a4d8c3d628c32cca28476","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL36.tiff","checksum":"1220b25c6fd1e4b445c265d82ba5173fbc899b5214e923f6b5017fb6245d980eba86"},{"id":"BL37","bounds":[176.2251386,-40.1550287,176.5217154,-39.8230631],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL37.json","itemChecksum":"1220c591f95000cbf0f3bb51f839b387634acd1b10f66b4d6571680e0f21cfccc3d1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL37.tiff","checksum":"12205216b495da53b07cfcbcd7a15fd9ae879d10a5228083bafe26e2223451fc4bcf"},{"id":"BL38","bounds":[176.505111,-40.1468058,176.8028877,-39.8142597],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL38.json","itemChecksum":"12209e8aefdb2b70cf52e9562e3a7019b2bf46ed2c9c0c58bca44d4699c5e361afeb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL38.tiff","checksum":"12209c65fd5797b8f0bbd74e0a191d55b4ca964b2cfe325f706dffc1a7686df988db"},{"id":"BL39","bounds":[176.7849651,-40.1379015,177.08393,-39.8047833],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL39.json","itemChecksum":"122085edb6287e7288379445f5134de502d89d81aeaa2743874bc1cb1ec5d65a81a4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BL39.tiff","checksum":"12207452db95d38a37adc4d8cb472f3b17219a28d9ea78aa030204084e3bbc3f4fc5"},{"id":"BM24","bounds":[172.5749897,-40.5246453,172.8590056,-40.1996269],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM24.json","itemChecksum":"12208cf40ff17b798db1b1c0ad13965a83d12f6ffa416a81b196defebe8dfc412bc3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM24.tiff","checksum":"1220633bf7d3d5c8021e9d0b4fd266a5b8565b0ade0b1e7d5df09c0e80c008fc0c25"},{"id":"BM25","bounds":[172.8583283,-40.5246453,173.1416717,-40.2003137],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM25.json","itemChecksum":"12207017ee9c410727a69fafa478380942046e3c6b86a489c1164ee2a0621c67e4d5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM25.tiff","checksum":"1220400ecfebc2bd2c1efd2fdfa40494382f7b225eeed1d8a983cbf99d826ab39cfe"},{"id":"BM33","bounds":[175.1142379,-40.505201,175.4074134,-40.1756004],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM33.json","itemChecksum":"1220a93f95ecb11b55cb0b323a8f4caa875fa691a43651ce06e8e84bc5d47e77b0be","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM33.tiff","checksum":"122014d912e598e8996a5a2957cb06efb5871751fcfc4b4757104452ffde824138d2"},{"id":"BM34","bounds":[175.3959169,-40.4996488,175.6903577,-40.1694267],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM34.json","itemChecksum":"1220c154f6101308ea68adfbc8716aff145f2607198def61d3065a8aaa1ccb077dd7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM34.tiff","checksum":"1220c73f9190fc313e6abb60dfda020b786b75db2a5e80f1de8483525162e3a270a2"},{"id":"BM35","bounds":[175.6775138,-40.4934044,175.9732086,-40.1625693],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM35.json","itemChecksum":"12209715d7616569235515c949e889d2ef8297fe7ca03208cdf7ec98dec5fb9d1669","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM35.tiff","checksum":"1220c38f8785db4f2f67c2247dba524797fabceb9536ff0c2a8782e197681bbef4b9"},{"id":"BM36","bounds":[175.9590189,-40.4864685,176.2559562,-40.1550287],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM36.json","itemChecksum":"1220140fe00d4708f485becc420b1e1b34930d50ba51adcd2221cb7d936c31228860","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM36.tiff","checksum":"122037b123e8f37e988bcdf08132a28a977f6ffe6c20c2a4b183098782712b1a4035"},{"id":"BM37","bounds":[176.2404226,-40.4788416,176.5385908,-40.1468058],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM37.json","itemChecksum":"1220668aefc5bab9f562b02f9099a76bfc8e52b26c4bfcbf8c18a93cd3d156db08fa","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM37.tiff","checksum":"1220d88ee344a82ad9b8fa9dd9f2d99f824460a7cf2fbdba4b140a0c89a648fcb12b"},{"id":"BM38","bounds":[176.5217154,-40.4705246,176.8211028,-40.1379015],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM38.json","itemChecksum":"12204ced13b96f816768e773502bb83855048b036e3d0fae75384db44005903b245b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM38.tiff","checksum":"12204fe30da4c7dc51d57f2eee1e36e8f29dcf4522fe11c6e0fd2a9e58d025449c65"},{"id":"BM39","bounds":[176.8028877,-40.4615183,177.1034824,-40.1283164],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM39.json","itemChecksum":"122054ec2086ae1802d3d2adc95c65e5cfe4cdac57d7c7f1fd1f25c9a2177fc44d56","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BM39.tiff","checksum":"12205ca7bbea90de7a15a6aa19488f6b90a0a76f185c05d1a324297e511252561992"},{"id":"BN22","bounds":[172.0035492,-40.8468505,172.291666,-40.5204771],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN22.json","itemChecksum":"1220fc9a3952e21700ba36ae568c58f341e69bff04257912f7e2e6ee100de963be35","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN22.tiff","checksum":"12204c8388f17480d9f98bcd10532785ebabc4f567a5eec9d1b23e2b736d17d7499f"},{"id":"BN23","bounds":[172.2882243,-40.8482559,172.5749897,-40.5225611],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN23.json","itemChecksum":"12202ac277c1a98fc7fc931cac211d165fa8a1c096eaaa97d3cf99c6c3a231919da4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN23.tiff","checksum":"122036794badac66b287c59d86c47ee599ef1401435bc9f7eab85b94c702e81f3f0a"},{"id":"BN24","bounds":[172.5729245,-40.8489586,172.8583283,-40.5239505],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN24.json","itemChecksum":"1220c064ecb4e268bd52e79d013c7340969eb4a6d78008661974c657b7e4079ca55f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN24.tiff","checksum":"1220148398e1c7ccab587c603830873669259d966262a3566f637c3ccfbf0f1c9bc5"},{"id":"BN25","bounds":[172.8576398,-40.8489586,173.1423602,-40.5246453],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN25.json","itemChecksum":"12200ae3df72cb8cf694bb64b1e8c4edb1311141c46da78fb1df0489faf8bfbb20c7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN25.tiff","checksum":"1220c90ac2a9d0b4504b8c529c777ab1dfcfd482b22dc86f6b12c0fcbfc1ec93ba69"},{"id":"BN28","bounds":[173.708334,-40.8468505,173.9964508,-40.5204771],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN28.json","itemChecksum":"12206360607c520a41b7ad37f9807917122276eb703a16db6bb34c4c85c407474392","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN28.tiff","checksum":"1220e041386d2373c8dcd579b1724f5b6147704e3968f3334e5b4008d785a693c8c4"},{"id":"BN29","bounds":[173.991633,-40.8447427,174.2810908,-40.5176988],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN29.json","itemChecksum":"1220cb9cf69f96b04ced5681cda6f052af1b0c538f39047d88f7701ba254bf76c354","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN29.tiff","checksum":"122079b2b9004f4f71854a127dde852fafc27b9159b0360eaab4c34a4081f7fe2c2e"},{"id":"BN32","bounds":[174.8412836,-40.8342068,175.1346992,-40.505201],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN32.json","itemChecksum":"12203d0b4125103ddd1438ae1fe399f60010f20f3d6e60973c62c5f915ffe76a9cc0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN32.tiff","checksum":"12201eb1d6815d4fe66598411e38ad51d0d4e2854a2db2f292c7547c2abcb388717b"},{"id":"BN33","bounds":[175.1243855,-40.8292918,175.4190982,-40.4996488],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN33.json","itemChecksum":"1220d76950513a60b46342b0c7344e4c1c414fcc6f5b4bf74305474772bbddfafcc7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN33.tiff","checksum":"1220ae9c18a6110cb934eee51d3abf27cd9b190ce7cd689059b7ae11396c831bf5a4"},{"id":"BN34","bounds":[175.4074134,-40.8236762,175.703412,-40.4934044],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN34.json","itemChecksum":"122034d79fb710d8a289f394c09f4fbbdcace10848d1df5971611ede3ddede195748","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN34.tiff","checksum":"1220f4c2a69f7c44d3e6bdef39bab31eed76e194170e24c129e584ce25603eaaf0e6"},{"id":"BN35","bounds":[175.6903577,-40.8173605,175.9876305,-40.4864685],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN35.json","itemChecksum":"1220db54ad5723880bfdbb16b9dbf397826c685ae0311fd1bb1798acdaf1e341c1dd","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN35.tiff","checksum":"1220d3ef7708e1ac51d205a9ddbe296b05a31848813199c05944bbfbcfc8e98147cf"},{"id":"BN36","bounds":[175.9732086,-40.8103452,176.271744,-40.4788416],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN36.json","itemChecksum":"12201bd8c7234bcda2bcd77ff3b6edb7f0a95f43899e5d6c36901f19569bc442a089","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN36.tiff","checksum":"122022ad9dde60c69cc080013019482ddc85c627da87e0b8789fae3a15828f2a10dd"},{"id":"BN37","bounds":[176.2559562,-40.8026312,176.5557423,-40.4705246],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN37.json","itemChecksum":"1220faf14fa145d340fccc1d15d2a838101477e966b5fe3105bc3cc3a328de8f592a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN37.tiff","checksum":"1220c2401d07c0c879fa57fbca592f0d34ff37b547cd34b32a7086131c1c3a010206"},{"id":"BN38","bounds":[176.5385908,-40.7942192,176.8396158,-40.4615183],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN38.json","itemChecksum":"122041ecf48712cd8d42201ec5ff6b96ea8b0feda65bb8e8c1079a62defb20ffd1f5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BN38.tiff","checksum":"1220ae9cc3c05195f6249187bd48b0b121817a0b5380fd4e3d9e6f5ad2200b5edc2e"},{"id":"BP22","bounds":[171.9986522,-41.1711214,172.2882243,-40.8447427],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP22.json","itemChecksum":"12209425568a32983b5912b1cc0d13377a8c63f72f7370251ad7b77d96984bceab46","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP22.tiff","checksum":"1220e0a06b7c66786dc638e91efd57a15a4389fd467211fe390c5766bd5bcbb1b1c4"},{"id":"BP23","bounds":[172.284726,-41.1725428,172.5729245,-40.8468505],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP23.json","itemChecksum":"1220749ae5101d9c931766c16bc53987206fd489ea18835d69c832704078f4429470","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP23.tiff","checksum":"1220aa3a32946c564694f15b8e2698a7ced806746e5584836aae6f43ae66ec430730"},{"id":"BP24","bounds":[172.5708254,-41.1732535,172.8576398,-40.8482559],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP24.json","itemChecksum":"12205f054a17f590cf05d5d30dbabfbd1f7afbccccc3ebfe10a8124d9ac1b58e1299","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP24.tiff","checksum":"12208a7dc4cc283fe284b55218e9ebb7e294e772dabd836570acaeed31f80625ee5b"},{"id":"BP25","bounds":[172.8569401,-41.1732535,173.1430599,-40.8489586],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP25.json","itemChecksum":"1220fc74f1a8d46027808714aa4f13fe424c1f56e098c660283f994f9ef014c1b585","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP25.tiff","checksum":"12203caff9f17c4b35772bfdbfbe77ba9ee0da4a61fd0ceacfae36fb63e00726c1b7"},{"id":"BP26","bounds":[173.1423602,-41.1732535,173.4291746,-40.8482559],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP26.json","itemChecksum":"1220be053cf6a4eadee92bd2c0c9f2b437f91ffbb78c2a9265ca7ceae1a094ebf26d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP26.tiff","checksum":"1220cb44ba87b29d6580d8ab6fadf757b1a3a8d47fa312d0680c1334f9dccff088b9"},{"id":"BP27","bounds":[173.4270755,-41.1725428,173.715274,-40.8468505],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP27.json","itemChecksum":"12206b38b45a83b0c306c24b5745b91ae85b2ed333df5a821af6b6a0e709c3070bfb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP27.tiff","checksum":"1220b2cdcd8c7ccc474ffc3b04b1bb9b6d5422fc8e5b108b09a946992e54ee278186"},{"id":"BP28","bounds":[173.7117757,-41.1711214,174.0013478,-40.8447427],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP28.json","itemChecksum":"12203470dc3a68736461f8937ab81f9bac4f0808570b982941cb00c78f086e95f39a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP28.tiff","checksum":"1220a3c73e8440df9d48caa688dd517d4cd5fe3813e40bf2a29795eaee5f29765d3d"},{"id":"BP29","bounds":[173.9964508,-41.1689895,174.2873857,-40.8419326],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP29.json","itemChecksum":"12201e5a49472167092f98a0363820348981f9e49246bcfc38c1f317aa18690fd51f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP29.tiff","checksum":"12201555a4cf1aa1e325fc7ec42dddc249349d24a29e9424a40d1daca31018a0cf10"},{"id":"BP30","bounds":[174.2810908,-41.1661473,174.5733776,-40.8384205],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP30.json","itemChecksum":"1220a3d5a2281a21f128dc5234eedc0f0db218ccee96e3a4531c21d1f4eee18ba17f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP30.tiff","checksum":"1220d10105aa9d2423dcb75326143d9b00ba8b6891cfd5e02667b49d9ec6c47613b2"},{"id":"BP31","bounds":[174.5656855,-41.1625951,174.8593132,-40.8342068],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP31.json","itemChecksum":"1220efafda995e625a6a18297201168b09dea0a14f8b4af1d70bea55cfeae836611f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP31.tiff","checksum":"122078d25bf4570e974553c52c2b3eb29d96e92140e1be729b1792e8f9961ce6b88c"},{"id":"BP32","bounds":[174.850225,-41.1583333,175.1451823,-40.8292918],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP32.json","itemChecksum":"12204a678ed92c339886cf16dc83df7766f4fabf4de24b4686be5cd0da7d4f905edb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP32.tiff","checksum":"1220ac8c7cf53b7c12288becb1d6f62dc2a05caef7d20d681ce1df98f147b5363344"},{"id":"BP33","bounds":[175.1346992,-41.1533623,175.4309748,-40.8236762],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP33.json","itemChecksum":"1220645717e8297cd19f2e1b02ca1969a2ce2491f33f51cdfe356cc3b1a959a856c7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP33.tiff","checksum":"1220e65345ec0487b14da7f5602c9584288fcb793d02fb73669792e55d6ea9e5911d"},{"id":"BP34","bounds":[175.4190982,-41.1476826,175.7166804,-40.8173605],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP34.json","itemChecksum":"1220a8028ff38d600590061419d00ffcf9e29e8c444d6c8f44cb223a2643f459196e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP34.tiff","checksum":"12209975ad8a94d0e77a0d4f6890996538d282ffc03ab2060990b5906918c52e0e98"},{"id":"BP35","bounds":[175.703412,-41.1412948,176.0022891,-40.8103452],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP35.json","itemChecksum":"1220599263ce78d75b7011cd90a0cb476177024ebf3c0ac58bb268168bacf1c5fdbb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP35.tiff","checksum":"12206230e4a038c3f6bbfaabb3757804f38767602b5abf3af41928707533e91593e0"},{"id":"BP36","bounds":[175.9876305,-41.1341995,176.2877906,-40.8026312],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP36.json","itemChecksum":"1220031534b760896533366d0d97f42da5da04a6ba4b1a5da86c74e3895e7c40a967","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BP36.tiff","checksum":"12209e49e4c4bbb743fc75952935bcce2619fa64ca63db589327d0e4a8aacf9848c4"},{"id":"BQ21","bounds":[171.7062157,-41.4932175,171.9986522,-41.1661473],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ21.json","itemChecksum":"1220f508b1ebfb0079a9d47eb31160d2c3a5783e3329286ee321f101c78d59a15e40","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ21.tiff","checksum":"12208a23f388216c9fd5871aad5688b505df374cb63c7978670ca10baeef07b0f6c4"},{"id":"BQ22","bounds":[171.9936747,-41.4953737,172.284726,-41.1689895],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ22.json","itemChecksum":"1220ee71735a6812ec202eea4209e04d2c5f1f56a022f16d24bfe7545137178f9c60","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ22.tiff","checksum":"1220fb78c9ddabb19532266b61bc28f4b7fdcdb0dd6287d4bc5b702c00d1372f0674"},{"id":"BQ23","bounds":[172.2811701,-41.4968113,172.5708254,-41.1711214],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ23.json","itemChecksum":"12203f8ab9d770f5ab26feaf04fc38a300bb91ac0caf1e3524af73f3cd972b76bab4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ23.tiff","checksum":"1220addf890045414fd1bd6234dc8803fe58ab521af057c54938260a7c20f47c6bdf"},{"id":"BQ24","bounds":[172.5686916,-41.4975302,172.8569401,-41.1725428],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ24.json","itemChecksum":"12200051ea7fe8ac67005b60c3fc31e362ad8c3af7080e53754cb21129d19c8fac5f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ24.tiff","checksum":"1220edc4e4054de42122795130171a899413946b98117d53ecd1aa05f184918fa708"},{"id":"BQ25","bounds":[172.8562288,-41.4975302,173.1437712,-41.1732535],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ25.json","itemChecksum":"12208b230dfc047ced581f5f826b0ce52f0cc291005aa82e6db2059f24ff11829a6c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ25.tiff","checksum":"12201bf11442810997bb2cb238564d83daee1c011a39121cb48400eb66e31d057f7f"},{"id":"BQ26","bounds":[173.1430599,-41.4975302,173.4313084,-41.1725428],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ26.json","itemChecksum":"1220608c7e0e12270a2cbd09174ed364359086ca78c7f6be0a415415ea67e3fa3be5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ26.tiff","checksum":"1220ddf14b5b1c576595ce0170120f5149ee6683181acbca66b7d55c5bbb420d19e0"},{"id":"BQ27","bounds":[173.4291746,-41.4968113,173.7188299,-41.1711214],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ27.json","itemChecksum":"1220f4916642646840b4accad51ae37a0d66e55f7e2a7c0b48d4e3465da73f58bab0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ27.tiff","checksum":"122056671ea09df3d7de17c1915e211f7f48b507a220794c25d0f3551849a77dfebc"},{"id":"BQ28","bounds":[173.715274,-41.4953737,174.0063253,-41.1689895],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ28.json","itemChecksum":"1220f1d1c8753a1b87ba792b0917e03392a3d0e5704893a4c9e6602d16282b70d5f0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ28.tiff","checksum":"122040ef49c409e0233813b402e1942c6f12fbebd29acec588ce300460d6847f6822"},{"id":"BQ29","bounds":[174.0013478,-41.4932175,174.2937843,-41.1661473],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ29.json","itemChecksum":"12203c346256a3750c7a6c916477ca7d593dc9066d53827869a1e80e01229d5147a8","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ29.tiff","checksum":"122006f01377baed84180abecc6eeb92096a290e427a4c05d4fcea70315249611a44"},{"id":"BQ30","bounds":[174.2873857,-41.490343,174.5811963,-41.1625951],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ30.json","itemChecksum":"12201318304315bf056fe1fa015b627027e04be007f434b1391da4bf9cf95ec1a8cd","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ30.tiff","checksum":"122005a06ba80de07820cb9b3b3776076402cc2349ada9285e151618b67363e53106"},{"id":"BQ31","bounds":[174.5733776,-41.4867503,174.8685509,-41.1583333],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ31.json","itemChecksum":"1220a092e58f1383e97d3de1b509bddad543ee86c070f8daf4cd3ad21f6f799a7515","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ31.tiff","checksum":"122079f5365babf92e59e3e7d490a2da9bd4b04cf27239a8e9b46a978189caef755c"},{"id":"BQ32","bounds":[174.8593132,-41.4824399,175.1558379,-41.1533623],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ32.json","itemChecksum":"1220660a4b93a88c000310311c2faead75f957352620b9f51c90537857bca229245b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ32.tiff","checksum":"12204842b61199450efe715ddb7591c01643dbb8617ced61c81b36221e000aa9ded1"},{"id":"BQ33","bounds":[175.1451823,-41.4774122,175.4430467,-41.1476826],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ33.json","itemChecksum":"122049169dcf5db88acf8ca5f34d12b23455b9af7a01ddd69f669bc3570c94f1abd4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ33.tiff","checksum":"1220e285e69431e7b121fd9e96df7483b9b4e986bffefb189a5da57ef83abf364bda"},{"id":"BQ34","bounds":[175.4309748,-41.4716678,175.7301671,-41.1412948],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ34.json","itemChecksum":"12206b1647bf288fba5204f57f670ed93153e6d68da9bb34fe923697fc48c290e711","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ34.tiff","checksum":"122088d541284fb040166321b1189e06375dc4e7681c20d58d502763609202eb8eea"},{"id":"BQ35","bounds":[175.7166804,-41.4652072,176.0171886,-41.1341995],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ35.json","itemChecksum":"122046ad40f8c370b246b6e41767473304a4b434032edb82671b81712da307345f88","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ35.tiff","checksum":"122051f53c6280c718b29ab81f97727abe53ea032f3b8db08eb813ff79838cc07070"},{"id":"BQ36","bounds":[176.0022891,-41.4580311,176.304101,-41.1263975],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ36.json","itemChecksum":"122049c93b9c1e52cdce9802c4397dbdc6409812619bc39fec5e9a4cf4e9cf37e53f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ36.tiff","checksum":"1220eabdd7a9898be409b6362d477bd031d8ce18937b2c9e596dc2cdf63ed805d5e8"},{"id":"BR20","bounds":[171.410856,-41.8145194,171.7062157,-41.4867503],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR20.json","itemChecksum":"1220fce3e5c97d3249f66d6db15a6f4cb673b28f420cfd166a33aaf52d00bd6a68e4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR20.tiff","checksum":"12202401f099b6b412d165a90d50ed73195174862bf0680047569fccaee68ba29905"},{"id":"BR21","bounds":[171.6997116,-41.8174267,171.9936747,-41.490343],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR21.json","itemChecksum":"122076345838e15981774cbea1f7500269b5187018c05911bf81a967338425c4d0ce","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR21.tiff","checksum":"1220ff9a1639884752fa4fb086a6ee95a8aa3f094cae331b4286f5c78afd43b56198"},{"id":"BR22","bounds":[171.9886149,-41.8196075,172.2811701,-41.4932175],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR22.json","itemChecksum":"12204da6cf4568116b4491aff696759355609163a851bd43ac34ad1d300da56a3868","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR22.tiff","checksum":"1220c3ad9b65d2f7a205beba1c7703974ea32aa9a824b7e97a223d0e448f00ab05b2"},{"id":"BR23","bounds":[172.2775555,-41.8210614,172.5686916,-41.4953737],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR23.json","itemChecksum":"1220fe43bf7f528267b4148359a201cce4675b94c9ccf8040b22706911dd51d3120e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR23.tiff","checksum":"122007d0992d58ee289a19fcf34b13d2ba4975b0c9f577c284c53948419980ee6e1e"},{"id":"BR24","bounds":[172.5665227,-41.8217885,172.8562288,-41.4968113],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR24.json","itemChecksum":"1220d83a2b5276c516a1dd18c538b357d49badb62bbbab0a08b6cd681d645474212d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR24.tiff","checksum":"1220d4af2b22b38a176076ae2789851ab6f91a78d38cc7b80944729c40bf257be98e"},{"id":"BR25","bounds":[172.8555058,-41.8217885,173.1444942,-41.4975302],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR25.json","itemChecksum":"122029a494ef3dbfbbaeab728e271d82a62644c67d38e8a4fc1bf27c00ccb7267598","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR25.tiff","checksum":"12205985a230b7100d3bdb00dfa80f9dff8f073336ffdcf47f0e6f14c075e30a8089"},{"id":"BR26","bounds":[173.1437712,-41.8217885,173.4334773,-41.4968113],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR26.json","itemChecksum":"1220dcf76c416a2eff7d03f47e690a5b2edb74ca4715c1be4c758afd4c1430c79de5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR26.tiff","checksum":"1220a996a7502c2a438c7f13cb3cb1880ab86cbb450fcb1bee702df5aa90eda46d14"},{"id":"BR27","bounds":[173.4313084,-41.8210614,173.7224445,-41.4953737],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR27.json","itemChecksum":"1220d64ee9baf34f5036457574b1ffb0ebfedc3b9ce297181ebd6d9dfbf31306ff4b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR27.tiff","checksum":"1220e389d289f2332334f6f75c1ea2fbcdd9bc8ad87e1640a720c7c833af24eb580a"},{"id":"BR28","bounds":[173.7188299,-41.8196075,174.0113851,-41.4932175],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR28.json","itemChecksum":"1220d4dd81b5424e7d48f6f76bb736419987de3036064d39713c72b68ab33c105de6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR28.tiff","checksum":"12202fccb7b4bcc9514694fabdb9dc7525d6b5e396fda51a765db23f21632ba8d095"},{"id":"BR29","bounds":[174.0063253,-41.8174267,174.3002884,-41.490343],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR29.json","itemChecksum":"122016628f8b16bc5847aab73b44915d612aab1733ed5d28bc591c8ddc9517a7e1bc","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR29.tiff","checksum":"12209f96a30f8dbe9fd7145c9017851da04bd0cbe80d8af17fc7bc145003eda2e6cf"},{"id":"BR33","bounds":[175.1558379,-41.8014415,175.4553177,-41.4716678],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR33.json","itemChecksum":"1220c7f142f036701a136c455d371c311a530c87c502ae8ee9e1a2147825d180bba4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR33.tiff","checksum":"1220c8a529d5e646e9bd688dda679c6fcc66caf88ed6c30756e75304792c9bb9cd4b"},{"id":"BR34","bounds":[175.4430467,-41.7956317,175.7438761,-41.4652072],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR34.json","itemChecksum":"1220c4287cc693e021aaab229e4a9b786195722209b29e68bbf91dbc5912795bec78","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BR34.tiff","checksum":"12201920a32fcda9a885415476a7830bbf83d7bb068f0d258c1c32548ce058a174e9"},{"id":"BS19","bounds":[171.1125134,-42.1350018,171.410856,-41.8065264],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS19.json","itemChecksum":"12201e78554ca5b9520ba364065f06f2b58c40ba090213ef776a8063334af91ea4a4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS19.tiff","checksum":"1220b044386bce4347185eb30e74529d8210a726e61fbf0a1421aaa39ceaf4a28827"},{"id":"BS20","bounds":[171.4027768,-42.1386767,171.6997116,-41.8108859],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS20.json","itemChecksum":"12200d8e7040ee70b2ad720240a9da7495d92ec9a2176399133972fd1cadbfbb16e7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS20.tiff","checksum":"1220b27d670d97175bfe87b76ff331782ff0640b49bad0390551962bebc932a4caa4"},{"id":"BS21","bounds":[171.6930998,-42.1416171,171.9886149,-41.8145194],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS21.json","itemChecksum":"122088eb386a9fc446c1b1dadbf2293ff7b4e159d929e725d15fa78c258283fe3447","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS21.tiff","checksum":"1220c718aa70d8d9b3288e4ae5fe82567d0c268d79b9dbe9d557633401b5396d29eb"},{"id":"BS22","bounds":[171.9834715,-42.1438226,172.2775555,-41.8174267],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS22.json","itemChecksum":"12208e5a1b12426824c90659ac237e2d29af4c523f7e216509ebab844bbf9f70bfed","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS22.tiff","checksum":"12203e91c7b554edcd07eaecacee6890ac08947a0bdb83ff00ee8b14982720ba08c1"},{"id":"BS23","bounds":[172.2738811,-42.1452931,172.5665227,-41.8196075],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS23.json","itemChecksum":"12203bc8fc7b4f640148709ff644c2ecacb0327ad771d532bc95352a20e4fdc062f0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS23.tiff","checksum":"122092cb26e69300ba5d5d8435d7112fa9907db5d2f7fbac5cfdab31886ea614a902"},{"id":"BS24","bounds":[172.5643178,-42.1460284,172.8555058,-41.8210614],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS24.json","itemChecksum":"1220f3fe7eb886f86421f7f901350d679c0b63c67db18c94f023fc70fbaa3f152178","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS24.tiff","checksum":"1220b40f1203bcf45f33a19d0dae5b1613b8a5696c81225c7271898e5d8593f8e30f"},{"id":"BS25","bounds":[172.8547708,-42.1460284,173.1452292,-41.8217885],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS25.json","itemChecksum":"1220fd1c9b3df8d969361379396cdf63907d398d3cdbb8e06d9451f7afe1bcbcafe4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS25.tiff","checksum":"1220924ab9987e0f350c184951cc8476daa8b36aed0258c0f44c37c58728f66f4c68"},{"id":"BS26","bounds":[173.1444942,-42.1460284,173.4356822,-41.8210614],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS26.json","itemChecksum":"1220c1bea45868dfb2d114547a457f6611223248c1b354d973357fd5a84c3bac748f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS26.tiff","checksum":"1220958683a75258a62e6599730ab5c87c45be2895f96143ef49607ec46fc2f2d824"},{"id":"BS27","bounds":[173.4334773,-42.1452931,173.7261189,-41.8196075],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS27.json","itemChecksum":"122009bbe9833d9f630f6c7ac588b8f6ce0f957bffc78a420352148cb0fdea04e874","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS27.tiff","checksum":"12206c683b0b654b97d53efa3f505b18068925a7af1282711d980f05699b768bb6fc"},{"id":"BS28","bounds":[173.7224445,-42.1438226,174.0165285,-41.8174267],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS28.json","itemChecksum":"1220d9c28e5b72db00125c9f4c992334e98c1ab59852020dc9782bd306eb5b150c07","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS28.tiff","checksum":"1220bcf6de94e67a76f74c7a5b9d859a44113c3975af6dc4b814531ba40b10835f00"},{"id":"BS29","bounds":[174.0113851,-42.1416171,174.3069002,-41.8145194],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS29.json","itemChecksum":"12209b09c8cadd70fbd651c27a322544aac35044d2f0e43a05dafa0ce0e672458e90","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BS29.tiff","checksum":"1220a2f4564762680746ee6d70efd46978ccf0b57ba42f0ca7626f732b9698f997ec"},{"id":"BT19","bounds":[171.1028097,-42.4590981,171.4027768,-42.1305928],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT19.json","itemChecksum":"122017d81bb730dc2473fd40c861d1cdcab1b7847048d07abb26760d74fafe60904e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT19.tiff","checksum":"122068481cf52ccbe25f0fc51a880afaf28351bac51c601b922978f83baee2e12334"},{"id":"BT20","bounds":[171.3945636,-42.4628147,171.6930998,-42.1350018],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT20.json","itemChecksum":"1220b956e243aea4b0c77abecb37977b5040008fabd8fa813e6e9bbae14abb00e6b6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT20.tiff","checksum":"12202b02115372da9cceeeb9616b23a3cb301d89acb41867165656b933ef9243ae8f"},{"id":"BT21","bounds":[171.6863783,-42.4657885,171.9834715,-42.1386767],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT21.json","itemChecksum":"1220afdd71695feb203d3702a2173c2eb4c226d63742c2c0704f92c03208c1fbc558","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT21.tiff","checksum":"12202c83f7c7f9f720f33c1dce439967408615b98e75edd7c8cff16ca068dac7c961"},{"id":"BT22","bounds":[171.9782427,-42.4680191,172.2738811,-42.1416171],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT22.json","itemChecksum":"122001f31cd682fe042dbb31ef6f1653aced41403ee9d244c72f36eab57e11ecaf3a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT22.tiff","checksum":"122022b52e94752cdc88498b6af39774020a0efb658a7e4b060cafda48ed3bbf3a73"},{"id":"BT23","bounds":[172.2701457,-42.4695063,172.5643178,-42.1438226],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT23.json","itemChecksum":"1220341c022d52c7c4b6040202879827e4d699b4ee728416d180d1370b1c12df2db2","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT23.tiff","checksum":"1220ee1259c6ee0049f8c9961d825381675de219b332f168eccbbee03d31b336fc88"},{"id":"BT24","bounds":[172.5620764,-42.4702499,172.8547708,-42.1452931],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT24.json","itemChecksum":"1220e8ab80f9de84809a1aaa21bfac7c2e02f849ab94ab0d82bbc4b2a6ffc650f022","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT24.tiff","checksum":"122094d1545330b77052a6fb8c17318cd94beed2f27973e91b59f0b96b1caf174648"},{"id":"BT25","bounds":[172.8540236,-42.4702499,173.1459764,-42.1460284],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT25.json","itemChecksum":"122087bcac1553dbe75ec7b3f8195fcad27971f3d1c19b9f0be0205177011aa44ead","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT25.tiff","checksum":"1220490abf8b2e5f4f46a0a14391e342dfd6286e9dec911826dee326260d5445ccda"},{"id":"BT26","bounds":[173.1452292,-42.4702499,173.4379236,-42.1452931],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT26.json","itemChecksum":"12205ca00307224f9699a52043c354c248c8075d96f356e7f313749ed8fbbc279eef","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT26.tiff","checksum":"1220de6991c8cbda346c90af65efa8afe8378f933c488c2dd01409337531dcb70479"},{"id":"BT27","bounds":[173.4356822,-42.4695063,173.7298543,-42.1438226],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT27.json","itemChecksum":"1220a33b63c3c45a5ce0d823aa95b73a47e4af87cefa783ec5976739855675d6f655","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT27.tiff","checksum":"12207bb3931b923edfbc8bc9982a6f3718e317d168928497c3130490fa0296401b61"},{"id":"BT28","bounds":[173.7261189,-42.4680191,174.0217573,-42.1416171],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT28.json","itemChecksum":"1220ab476c0fb43ba4a6fa8dfbb3ea0efe8ee484dfb62432bc16ebcc7b918df09cae","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BT28.tiff","checksum":"12200603ce80f68b7f7651eca456f0dba1058fc75cb21281f2c1182bd6a6045121b1"},{"id":"BU18","bounds":[170.7997483,-42.7786652,171.1028097,-42.4494381],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU18.json","itemChecksum":"1220cebb41917b693c693d8e52467f851fb17349dff62867e95593fd15f1a28f5ab0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU18.tiff","checksum":"1220ad6347a9eaba7ac4f71595df0ea1e87b5c3d63a200a83ba7e230fc5650ec55f3"},{"id":"BU19","bounds":[171.0929445,-42.7831748,171.3945636,-42.4546391],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU19.json","itemChecksum":"1220d118ba77f759dd4b07e86cd3737cfc0ac1dcef07fcb12276634e2b4e817d8857","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU19.tiff","checksum":"122031a9d28522b727e6634d0ac5097b6865807aa51bf9a8e31c8c8ed93c2e3cdcbe"},{"id":"BU20","bounds":[171.3862138,-42.7869335,171.6863783,-42.4590981],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU20.json","itemChecksum":"12201a5514baefae975a335cf91faebe4105794c3b6e5a889d60be0fb54d49a35351","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU20.tiff","checksum":"12204aeacc7b1d1adacba29155d658bf0f7f4f742aff13f283add7832eb331731a6b"},{"id":"BU21","bounds":[171.679545,-42.789941,171.9782427,-42.4628147],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU21.json","itemChecksum":"12206106ef0e8ff3fb2982df14d8f478b68b472eb93e5403ed712898f25804a4d9ce","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU21.tiff","checksum":"122044c181de4881b71a07e50858c9a56491296fbf014d41fc3eb06ff3dcf5bfcce7"},{"id":"BU22","bounds":[171.9729269,-42.7921969,172.2701457,-42.4657885],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU22.json","itemChecksum":"1220e720e1c0ba618ef8d8f4004d6b306c14afae265c03e4630b3dc1c3dab792318d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU22.tiff","checksum":"1220c9e009d4604c22845b82dba8be64c99dafdf6d8babf2789cbae0409613d697ea"},{"id":"BU23","bounds":[172.2663482,-42.7937009,172.5620764,-42.4680191],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU23.json","itemChecksum":"12204ad90f94f3befce714b9012d293a394e0569e077981240788e21e4bdd9ca2dda","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU23.tiff","checksum":"122029120ee218c13fc56c1f7ba5f4591ab604be19077fff3c50fd9e328057d2f3ec"},{"id":"BU24","bounds":[172.5597977,-42.794453,172.8540236,-42.4695063],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU24.json","itemChecksum":"1220773e14b7c66dbc1efc6aea5cf03293c0804ee7dcdc3395469b169f0a2016f582","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU24.tiff","checksum":"12200fc631c929f79a5d322383b3664bc766168b0a837f017c5a92bc249653c6a1d6"},{"id":"BU25","bounds":[172.853264,-42.794453,173.146736,-42.4702499],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU25.json","itemChecksum":"12205495a14b095e5b0b6df717b3b9dd15fea75e39645e3f25638b15d6233a3b4687","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU25.tiff","checksum":"1220c238f7201228794e41d9d0dd7bdb0c1d7cc3790086692c6ea7f5f722e81a2075"},{"id":"BU26","bounds":[173.1459764,-42.794453,173.4402023,-42.4695063],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU26.json","itemChecksum":"12207e7ec795624fdc5ef941c4fd62e7270f7a7659f9608def90d0f0b59cfbd4df00","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU26.tiff","checksum":"12207cf38097fdb315de65637fc74cf0413ac93f3bf0f3ec33fa57b68923f4155057"},{"id":"BU27","bounds":[173.4379236,-42.7937009,173.7336518,-42.4680191],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU27.json","itemChecksum":"1220b90d806fca74efbbe9968ac6ef362d1c5d981d050e0ae70536b0e89922357cc3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BU27.tiff","checksum":"12208ab320477571d62f286834cfeaa8ff269dd4dbff0bb49820bcd7c8c4ad8644e5"},{"id":"BV16","bounds":[170.1989782,-43.0912735,170.5066365,-42.7606363],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV16.json","itemChecksum":"1220632963ec2696a0f854e14815780a94b9b2a99b4017b458c5700a256c3c545bd0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV16.tiff","checksum":"1220bf0543864ba9579666ff8aba1b5aad363f8ee2c370abe642c0bae23d5878b35d"},{"id":"BV17","bounds":[170.4935302,-43.0973514,170.7997483,-42.7673953],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV17.json","itemChecksum":"12206d4fbe5bf54ad1a9ca6918e13ad1af0686b38fe84361a21167da706462c36aa3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV17.tiff","checksum":"12202d592dbc30f2b109843f625835e431cb4a18620563b4f7c7c3ced268f10b49e8"},{"id":"BV18","bounds":[170.7881796,-43.1026709,171.0929445,-42.7734052],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV18.json","itemChecksum":"12200ddfd17076216c3b86ee70f98b7e8fe2010eba338710767b7f463591883660ee","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV18.tiff","checksum":"1220df3053224f6059808bd428170e3b24753c176ae692b9c11ad86b7738da76faa6"},{"id":"BV19","bounds":[171.0829149,-43.1072316,171.3862138,-42.7786652],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV19.json","itemChecksum":"1220aedbeec503237177355f6c1134842c1cfa02179ab630b22ffbca54558d0d2341","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV19.tiff","checksum":"12204fef18513cc36f57b8f6b734eafaf3bee5810e2792b2f6b9a75d261b52fdac01"},{"id":"BV20","bounds":[171.3777248,-43.111033,171.679545,-42.7831748],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV20.json","itemChecksum":"12204242be9b69e08b9a4a3c7fa1505634f589a64ec75a10564897997b7889e3e20f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV20.tiff","checksum":"1220cda2c087be2ff839523d2add860f37f39dcc0d7fdfba2d68313f77d22612ed10"},{"id":"BV21","bounds":[171.6725978,-43.1140745,171.9729269,-42.7869335],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV21.json","itemChecksum":"12207504233c18d710a3e496e3946640fbad04713900b5f8d8744d8785800f20dfa1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV21.tiff","checksum":"1220809d4af454f194e7b744c180f4752844b2eee1316943d1c87ec1d198f244d74c"},{"id":"BV22","bounds":[171.9675224,-43.116356,172.2663482,-42.789941],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV22.json","itemChecksum":"12206f8103ea133258fca268ed78317bbe30260783be296f86382a08b4cbc6b063dc","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV22.tiff","checksum":"122085611129672909bb43a5102277cde2b49ce13bfe3040eccd29582894257e7cd1"},{"id":"BV23","bounds":[172.2624873,-43.1178771,172.5597977,-42.7921969],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV23.json","itemChecksum":"12207f17370c11aad438c725f800bd27db55f6a707731c9f618fdc9f6d35c29d0948","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV23.tiff","checksum":"12209a6732bb37e9599def56c09a6570d7937a9ed61fb8515ef3d58bce08c4ea8a2d"},{"id":"BV24","bounds":[172.5574809,-43.1186376,172.853264,-42.7937009],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV24.json","itemChecksum":"12203001490578334e13517d0cd807766dc84662fdf41b4d6d1428619ad7d7d0e24a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV24.tiff","checksum":"1220bcaa3ffef5582f346de213ce5a676d9d7099e8ee4ee2dcc1a75f9921f83ba754"},{"id":"BV25","bounds":[172.8524917,-43.1186376,173.1475083,-42.794453],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV25.json","itemChecksum":"1220eb71cd5f208236be0790cae631d3d8e1f489082eace8bc86c4c7c887d9326015","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV25.tiff","checksum":"1220e680dfdfef627bc3f4138c07edee66a84fb7c985a2ed57c4bee915423e224493"},{"id":"BV26","bounds":[173.146736,-43.1186376,173.4425191,-42.7937009],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV26.json","itemChecksum":"1220e3a1d978c5a0d7fc621aa36c5831b178c43ae37a22cfe9b76a8509fa9f562150","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BV26.tiff","checksum":"12208f6920b4e6243738e1ca6fa19f601a9d5b532ae81a41367aae42ad66a2b54f70"},{"id":"BW14","bounds":[169.5922097,-43.4005388,169.904535,-43.0684969],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW14.json","itemChecksum":"1220d36a2c70ff7e07d4423b76a9bf952e60b69e7026f038da3f9439c98aa190cb63","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW14.tiff","checksum":"1220fc0fc525892e8c701c14fa8f1df132b936f44038fed2a9cc0707cd5be7be23e7"},{"id":"BW15","bounds":[169.8880894,-43.4082171,170.1989782,-43.0768455],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW15.json","itemChecksum":"1220ec4798ab3931e5ba553f1a7a48b4dfda5ff7b9f3374b93675db86a688b8a9187","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW15.tiff","checksum":"122097ade8904433fb4b0348e56e5948bd9185e12a4bf7704a7795362a40feeb80eb"},{"id":"BW16","bounds":[170.1840917,-43.41513,170.4935302,-43.084438],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW16.json","itemChecksum":"1220139ac18a50676e6650bebf4955690eed3e59c2f291bf05f07698006ab585ad88","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW16.tiff","checksum":"1220877f5d6a320ccc983188e3c986a8d6bda3effaa17e2e4e8163554c598cdac2f8"},{"id":"BW17","bounds":[170.4802048,-43.4212766,170.7881796,-43.0912735],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW17.json","itemChecksum":"122002d268bb2801ae3ec66ed320c9191f6db0a833caefbf2943269a1d3ea3fd4fe7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW17.tiff","checksum":"12204adf36c75587e9feb1db9476b8da00ebe53b160f3a203a5436c68822f0fead64"},{"id":"BW18","bounds":[170.7764173,-43.4266564,171.0829149,-43.0973514],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW18.json","itemChecksum":"12207b243975c03ea39a203e88f403bf7e37383822f6a6adce57551b68f8e7a62b28","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW18.tiff","checksum":"1220a1a70459cc750dddb078cbf07b05ac03dfe9fa3de6b853efc33e079813701756"},{"id":"BW19","bounds":[171.0727175,-43.4312687,171.3777248,-43.1026709],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW19.json","itemChecksum":"1220117201a28e5ba2e773fe37c8da555a8b3b8366953e078d1c563d5bc4974e20c9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW19.tiff","checksum":"12207c6c1d407fb78f5f5857fb4787234bae9eb98f404780163ff5f101deff8cc18e"},{"id":"BW20","bounds":[171.3690937,-43.4351131,171.6725978,-43.1072316],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW20.json","itemChecksum":"122021edee48d55980ccd6d05336f7019f85d84011d46f067121d2d66aee53646832","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW20.tiff","checksum":"1220ce5ad7f0b095fb74e08a821dfd46fcb35f4221e07b4c072e122468573dd145c8"},{"id":"BW21","bounds":[171.6655342,-43.4381891,171.9675224,-43.111033],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW21.json","itemChecksum":"12203592b9fb2e53dad507db619b93bb7b318ec5645d4edc8b4ab90418e4ae40ecc9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW21.tiff","checksum":"1220cf2da9348be3e4b3df80e4faf7defadc83165814fbdbcf041bc690892b8afc07"},{"id":"BW22","bounds":[171.9620275,-43.4404963,172.2624873,-43.1140745],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW22.json","itemChecksum":"122036cf71c96936f1e95aa6b5bd6e8454dace280616b46bd67f570388974e373709","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW22.tiff","checksum":"12202e6b7c1dac5be9f577bf0f2281edb3052fef4f2cc0fb3fdf5ed030bc2d4da7c1"},{"id":"BW23","bounds":[172.2585618,-43.4420347,172.5574809,-43.116356],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW23.json","itemChecksum":"1220bc1461a5a557dd0aa5310972c960838eec4befce20b3552e449727a4d2bab666","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW23.tiff","checksum":"1220ade51584614fa3d3ac1f4adac2859a0041cc2ddca282aaf6b2fc531af07e4e13"},{"id":"BW24","bounds":[172.5551254,-43.4428039,172.8524917,-43.1178771],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW24.json","itemChecksum":"122035636057ffdf1d2a03c2d737580a11093e8c23f4f2f61830257bcaf7d49ba9d6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW24.tiff","checksum":"1220959d7417f67ca96c88d982b629c09b5fa2fe409941a4ba13ed4fea77f2856785"},{"id":"BW25","bounds":[172.8517065,-43.4428039,173.1482935,-43.1186376],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW25.json","itemChecksum":"1220fd5ade2387199869f7717cc66962a7dd19a20791943817d63fc78570f4ffa847","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BW25.tiff","checksum":"12205c7b4bbbd9b0696b5e36fc05e018b2917cfe52ce474c133ec939e02a4f4c96d8"},{"id":"BX12","bounds":[168.9794031,-43.7063596,169.296464,-43.3729197],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX12.json","itemChecksum":"1220517b5a61b50fe63e155237dd7a6e49397ed4954b28d35897ff5d3c1429fe1368","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX12.tiff","checksum":"12207ec115c1fb76df42f0afe4f28c0102603a8eeb64a88c35aa67edfd23a1e69164"},{"id":"BX13","bounds":[169.2765802,-43.7156703,169.5922097,-43.3828892],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX13.json","itemChecksum":"12202ec276ff7003c2fe74bea49147c645965e23ea9fd5cc83a64efe38d7fc93de4b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX13.tiff","checksum":"12209e0be08e2f67122ef8e09b60127766b519656912788551f455d97404907d3cc6"},{"id":"BX14","bounds":[169.5739059,-43.7242086,169.8880894,-43.3920959],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX14.json","itemChecksum":"12202c0b77d698158cc76c860979f8f6fd97d77bb6af889e2ab1261022c3f76e5065","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX14.tiff","checksum":"1220e310801968823a05926a44a98f2f1db1c8dff8b7354b51e9dd50d74552dd30ae"},{"id":"BX15","bounds":[169.8713682,-43.7319737,170.1840917,-43.4005388],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX15.json","itemChecksum":"12208d0749ceb8f2b7aee70d348176cccad3ea8e1b205b89c5206d0383fd438f1c22","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX15.tiff","checksum":"122034ab9db8760821f594adf0b54bf489015e3ae872777e4f7a2110bb7f5562575d"},{"id":"BX16","bounds":[170.1689555,-43.7389647,170.4802048,-43.4082171],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX16.json","itemChecksum":"1220f4e8733027fa228d8efef9763d3fa18a6d9abc822a95489c6b32dafa86e02641","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX16.tiff","checksum":"12208a3f91c3c2abc01a733a614950cb6f45048a82c5a9b42217aae256cffde23ab6"},{"id":"BX17","bounds":[170.466656,-43.7451809,170.7764173,-43.41513],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX17.json","itemChecksum":"1220bc036d11f04657e620a65a7a60dbe8597af13d2f0206d603276427cecd2509f8","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX17.tiff","checksum":"12201f4c0baa6ce543cb37eff5287c37a935ff4a315b217b90501ba4a964753cebd1"},{"id":"BX18","bounds":[170.7644577,-43.7506215,171.0727175,-43.4212766],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX18.json","itemChecksum":"122040151588e06830da54ce6b35a72e78ef5268b5bc287b50fae3a982992680f09b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX18.tiff","checksum":"1220c549c2db6872a3d68cc69cbe30afd563ab79358b5ff10d6fac37cb8a34a40bf5"},{"id":"BX19","bounds":[171.0623489,-43.755286,171.3690937,-43.4266564],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX19.json","itemChecksum":"1220202d59d40b304249c7badbe8d1eca05800700c59e272d746f8f24d7b247f355f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX19.tiff","checksum":"1220a6020375fa41bed6280e696fc09c3e2fc49f881c386a7f0533c28cc92ea1c846"},{"id":"BX20","bounds":[171.3603177,-43.7591738,171.6655342,-43.4312687],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX20.json","itemChecksum":"1220ecbfc4670317984899d439fffcebaf409c0d65724d86703c14e8fe435ba26a4c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX20.tiff","checksum":"1220c7850f48bc64e0a993b4424eb066ba810511dfb30e4246fd413f01962fd6b883"},{"id":"BX21","bounds":[171.6583522,-43.7622846,171.9620275,-43.4351131],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX21.json","itemChecksum":"1220a453b2b210df9ad73725aefbcbd17d3ed407448cca3be5eb8601b8073e542122","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX21.tiff","checksum":"1220007083f3c42f8859952ba1655221e0267c5833facf9fbbdc864a64fcff927247"},{"id":"BX22","bounds":[171.9564404,-43.764618,172.2585618,-43.4381891],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX22.json","itemChecksum":"122061dbc60b1ae2ddfbe604a4a0b3c0d3ba01720cd9f33e198127287cd89b1bee6b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX22.tiff","checksum":"1220ea165d5a9718e1616a84228cb138daa6bf170659409c20bae64c6b1a4152e59d"},{"id":"BX23","bounds":[172.2545704,-43.7661737,172.5551254,-43.4404963],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX23.json","itemChecksum":"122040bdd59f453d883e773530dc46c56e48eaf8bee05e5a1ec53c844234ba2064db","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX23.tiff","checksum":"1220d68b29b15ae50b1c9fc0a24012b53da420e86322bcb9045b7f8fc16d7fd31698"},{"id":"BX24","bounds":[172.5527303,-43.7669516,172.8517065,-43.4420347],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX24.json","itemChecksum":"12200732d815279026d8dc17d3be75bca4844a792ec70820eb9dff04540e69f5799c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX24.tiff","checksum":"1220353bbc194b34e0a75643073bdac65932f3e4f76304edc3d7afc0292b8f50b473"},{"id":"BX25","bounds":[172.8509081,-43.7669516,173.1490919,-43.4428039],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX25.json","itemChecksum":"12207f50f76939e6719914fd2193b26a94ac48a74ef75c70351d8bbac404cd3cd035","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BX25.tiff","checksum":"1220771ce115950063945838f6445f82ba1e2e5808d54491f4812d7b1d9063e91ecc"},{"id":"BY10","bounds":[168.3605229,-44.0086339,168.682386,-43.6738041],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY10.json","itemChecksum":"1220d45e8e903e6efe34e9ecacd78ab3579397390a98a4f3761c066981f49d93fb9e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY10.tiff","checksum":"1220630208d09558488ff5aab64db9a56f5edc4090712c2770371edd8817e661d5db"},{"id":"BY11","bounds":[168.6589648,-44.0196085,168.9794031,-43.6854254],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY11.json","itemChecksum":"1220d8f18978cd4723a6607a2aa977e5b517e938d1188f23f86e993508cb7c1743b1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY11.tiff","checksum":"122058a4ff8b0853225b299ce4cdb2a639ce86ac48efa87d40b26415a4aa414ee3a2"},{"id":"BY12","bounds":[168.9575819,-44.0298043,169.2765802,-43.6962776],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY12.json","itemChecksum":"12206bdf2d6efbf38507d6dcad2e575e62c5f94ed66f251977e4190cb3b3be7f7655","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY12.tiff","checksum":"1220b813d5be4d7aef7f1c100980ecb386f9021a26666eca5515b43922c4b7e5bb09"},{"id":"BY13","bounds":[169.2563624,-44.0392201,169.5739059,-43.7063596],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY13.json","itemChecksum":"1220e384889bb802bc832a39030cfec05cfeeee1c7b4ec36286152a3d392a2771c5d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY13.tiff","checksum":"122011d33037098ab979fc61708e755ed3460fd3c5afd7413c1df218dd3640769512"},{"id":"BY14","bounds":[169.5552944,-44.0478549,169.8713682,-43.7156703],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY14.json","itemChecksum":"122016e777c30fe565185b7b4dd05e3f1c8f8bbce46045cf73492e6e19c27951e4cb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY14.tiff","checksum":"1220270699f7fc5e951790c11b5cece95dae79b4709f8e6c6fa871111c9a31361dc2"},{"id":"BY15","bounds":[169.8543659,-44.0557077,170.1689555,-43.7242086],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY15.json","itemChecksum":"12206a043ea24bcfa70c128ee70a105ec2cb310e951307e5e74e057d5c52c1aa3aa7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY15.tiff","checksum":"1220b696b695bd45043142cf94f153aca0352c5c2bee2fc01a555e190bf63fe6820f"},{"id":"BY16","bounds":[170.1535648,-44.0627776,170.466656,-43.7319737],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY16.json","itemChecksum":"1220794368093573f9f4b8450247fe15683472054b9d864e150650372c055b6ae989","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY16.tiff","checksum":"122032aab3748d39f9715d020b9cfcd87fc8b9b27957dcafe8fe7f53e4a6fbe36e08"},{"id":"BY17","bounds":[170.4528792,-44.069064,170.7644577,-43.7389647],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY17.json","itemChecksum":"1220e5c78410dca02d17587ffe3c3f5da70b1fc96e48a34be0e3bad45b19ec73f72e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY17.tiff","checksum":"122079a6dd2f6ed92dd62ca84a667c5062a0245878f72773b247252d80d7d592f610"},{"id":"BY18","bounds":[170.7522969,-44.0745661,171.0623489,-43.7451809],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY18.json","itemChecksum":"1220b5ba700c104eb8c8767c3ebf9d111f241345e68c03ba35b7a49179d8852f2941","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY18.tiff","checksum":"1220ebfe776e1b20de3f94cb13ed4bff66013c365f5725ece95f5cf08c28201fb244"},{"id":"BY19","bounds":[171.0518059,-44.0792833,171.3603177,-43.7506215],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY19.json","itemChecksum":"1220518c1ef026677318740388d8478269074a25af4338923af6e36b902fc9170472","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY19.tiff","checksum":"1220c21502c607584ac1140c3450f248d0492db4ac61ce85aa13d1f35e702525cd88"},{"id":"BY20","bounds":[171.351394,-44.0832151,171.6583522,-43.755286],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY20.json","itemChecksum":"1220cabec85d91e5189d5e4587739c13f5b9b354684b0cdc5e2b1fa93ebb5a2c6ba7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY20.tiff","checksum":"1220f8acd4e25e34dff3d9b1d2696bf336dcdcda032fd088901e88984ceea84bf62f"},{"id":"BY21","bounds":[171.6510491,-44.0863611,171.9564404,-43.7591738],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY21.json","itemChecksum":"1220d88326e77bc40630b867f7e3130d6057c8fb5a47be570ad3464c168cb9410f90","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY21.tiff","checksum":"12200048ce2c8a60598b8792cf37ba223d850c1543060cd3440646129f901bdd2586"},{"id":"BY22","bounds":[171.9507591,-44.0887209,172.2545704,-43.7622846],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY22.json","itemChecksum":"12203a4db17cb8bd23596f2ec46322fbeb680f867db2f55927d9ac0634b71776715e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY22.tiff","checksum":"12206ccacc35f0fc476aefab122516fb77ba49b55ff269dc1c4cb50244d918151e5d"},{"id":"BY23","bounds":[172.2505117,-44.0902942,172.5527303,-43.764618],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY23.json","itemChecksum":"122081a8995dec896e4a834efead200f5d7462d56c695b88b784118fd094ffe8b4f1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY23.tiff","checksum":"12205c699c94f80be2096210fdd59636c4bb494d6589c8ca8c3c1dd3e6c2d98b686d"},{"id":"BY24","bounds":[172.5502948,-44.0910809,172.8509081,-43.7661737],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY24.json","itemChecksum":"12202acffa95f2e9fabfc682ac32deef6f95641a4e7c5b6ec0f7014190931b8ddefa","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY24.tiff","checksum":"122069607347ff6abb15fdc579a0980c68006f174f5370b41bf99ffe58beb1e590e0"},{"id":"BY25","bounds":[172.8500962,-44.0910809,173.1499038,-43.7669516],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY25.json","itemChecksum":"122058f3ccdb6c33f482325b996b1b39e65632fdc0edbab2302da116588e9034e528","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BY25.tiff","checksum":"1220200716103d4ad209c5a5101ed7872463e0141ef8b8f34715777210e46cd37981"},{"id":"BZ09","bounds":[168.0352097,-44.3199292,168.3605229,-43.9843529],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ09.json","itemChecksum":"1220efdbad77f351c3ada31ce6a2d92f26aa7030c74e229797258bc16eef95508a1c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ09.tiff","checksum":"12203a6aa627a0a8984d51bca03a73f05abef8888835078063cc2ec11a58afcd8d94"},{"id":"BZ10","bounds":[168.3350839,-44.331814,168.6589648,-43.9968816],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ10.json","itemChecksum":"12200dffbccfb22951b1b5469cc9f75e9986f8b027eaeeb1f48d418e9fe8adda68f4","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ10.tiff","checksum":"12203cb9494c8d6adabaf10ccf91c474e3dc7432ec2432c489d68015c5af25b06e47"},{"id":"BZ11","bounds":[168.6351491,-44.3429124,168.9575819,-44.0086339],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ11.json","itemChecksum":"12204892f47baa779037d0b931a85e21838bc4b981e85435d05b203c4790ce89d304","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ11.tiff","checksum":"1220a5b540face41ca344cd65abbcf41e16c1472041c8de8b3bde71f4a3c8d974dde"},{"id":"BZ12","bounds":[168.9353931,-44.3532231,169.2563624,-44.0196085],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ12.json","itemChecksum":"1220ffc788484dacb433279f6ad4986b049488df410329650f6054b46bb14799d08f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ12.tiff","checksum":"12209e56508db6d597b97beb016559afd10ee6dd150a9849207985f8169e6a2f8185"},{"id":"BZ13","bounds":[169.2358038,-44.3627451,169.5552944,-44.0298043],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ13.json","itemChecksum":"12201581d321ede8f56effcd33242ca60a2da7ae6aeab104f831ea0109995f0c13b2","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ13.tiff","checksum":"1220d00934ae02dd180b46d7e3b7db65f8caddd73c95768dc434483190b32e28c4ee"},{"id":"BZ14","bounds":[169.5363691,-44.3714774,169.8543659,-44.0392201],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ14.json","itemChecksum":"122040d0968c191dc2161a96e4120a3952c829ef7c3aa3e0b90a96e3742f1d19cbfe","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ14.tiff","checksum":"1220dc309218151a7fccc4ca4356323bb44c733826f9cc703c62db240874b41715b9"},{"id":"BZ15","bounds":[169.8370767,-44.3794188,170.1535648,-44.0478549],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ15.json","itemChecksum":"122045a5e0690ba35975a6326607b776e5a52ca9b0849304dfd0566f7499838c5ded","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ15.tiff","checksum":"12205d3a53a88bbfb21699692a30817463169515c6f98c6f41f52312c3f9a28c4fce"},{"id":"BZ16","bounds":[170.1379143,-44.3865686,170.4528792,-44.0557077],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ16.json","itemChecksum":"122042db60c0b4cb6b5c3ff7ba0078393454fad28d547b4be0f059b7d2d580790ae3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ16.tiff","checksum":"122077d1bd0521592eccc877b90a93bc0fdb85b355e668bc39ecbcf74f229b117e0f"},{"id":"BZ17","bounds":[170.4388698,-44.392926,170.7522969,-44.0627776],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ17.json","itemChecksum":"1220ed912ffdf4c3bc5a02d0c3661ce7a1a767d5e62af343fc2ccd579e6f003a4394","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ17.tiff","checksum":"1220e90134ee0d5c171738528972e6845fed3d2cb12b7327fa1b2b8742a88a16c04b"},{"id":"BZ18","bounds":[170.7399307,-44.3984903,171.0518059,-44.069064],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ18.json","itemChecksum":"12208508681d71c5d15ea491d85c1ffa2d3f8056f8588444fc22f323de15d476d11c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ18.tiff","checksum":"122013820aa3374a460a75159dc9fb5849f75477e2d9faf9a723ac0dff35bb6a9e73"},{"id":"BZ19","bounds":[171.0410847,-44.4032608,171.351394,-44.0745661],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ19.json","itemChecksum":"1220831dadc05bfc30ab1247b4146cbb091018789e472aa96c956e628269749002ba","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ19.tiff","checksum":"1220c59af9aa92bb64af4168d6f8d480728fb2a60c700504c5af2b116c597fa584e1"},{"id":"BZ20","bounds":[171.3423195,-44.407237,171.6510491,-44.0792833],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ20.json","itemChecksum":"1220c917f7f9c3b026a7e20ca01685f2ca41658ef6e2287872d13e29e4e537d9502a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ20.tiff","checksum":"1220751d60afcf6a296d459841ac18c8f761e46daddf42f8bd4c483b33d70c3c4ace"},{"id":"BZ21","bounds":[171.6436227,-44.4104186,171.9507591,-44.0832151],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ21.json","itemChecksum":"122032671d5cf9486d4a0e61a55eb38524fdfbce21e809079025743128ae5f5ce8cc","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BZ21.tiff","checksum":"1220ffc6f617f591ef5d39f8a184706932e8b0396b14c1126954915105a8e970f0a7"},{"id":"CA10","bounds":[168.3092153,-44.6549654,168.6351491,-44.3199292],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA10.json","itemChecksum":"1220dff764d52f1afbb67d5dfa54e85800c4817e879fe949f57fa8352f9689a145d8","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA10.tiff","checksum":"1220d20e576c3cb3ee151de549025a64468c97a10fdb0613c6cbdd1a8af345030153"},{"id":"CA11","bounds":[168.610931,-44.6661888,168.9353931,-44.331814],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA11.json","itemChecksum":"12205ee38f00cb4693837bfee60603d0b353f6a6be1678e94f547cf678b36e42805c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA11.tiff","checksum":"122070aafabdb59515212d93c1efb09e1264c091564ef5230a882694ec33e1084815"},{"id":"CA12","bounds":[168.9128292,-44.6766159,169.2358038,-44.3429124],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA12.json","itemChecksum":"122092dee7a47fc5bba871455d0ff3554aaec31d19ea51cb248e652c52b7c5caff92","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA12.tiff","checksum":"12205be32c54c4f0d5a44acb53b63e5da69f09dc8aa8148aad47c06a71b291218f91"},{"id":"CA13","bounds":[169.2148975,-44.6862453,169.5363691,-44.3532231],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA13.json","itemChecksum":"1220705a301d7d2710197cefe0f656ccb8eca5f8625870a03aca4a08912b4eede4fb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA13.tiff","checksum":"12209bc8aac93d71bdb87ea07d2bb2c32c3434ea6be54ae98c0dc6e9d74d6663ca53"},{"id":"CA14","bounds":[169.5171235,-44.695076,169.8370767,-44.3627451],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA14.json","itemChecksum":"1220beb7777321657fcb081eb87a48fc65c11aa76bb9b2f260e6c1ca737399646c43","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA14.tiff","checksum":"122061648de2da0b186f3652d4f843f7f71e5832c008e87f5804fc0322732f680608"},{"id":"CA15","bounds":[169.8194948,-44.7031071,170.1379143,-44.3714774],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA15.json","itemChecksum":"1220d8b5d73acb4603050700ec1ec9fb1c5c57475a09eb50fdcb0f0a3a8a09060537","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA15.tiff","checksum":"1220a46c02a57c7aa8de874fe85511a7be1f994b6b312e1a33f3c6e6b2ca7e428a7a"},{"id":"CA16","bounds":[170.1219988,-44.7103377,170.4388698,-44.3794188],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA16.json","itemChecksum":"122087d0cc142dc6aeaf5571272d2b88833aef028b7f56540b2e8b424b741898368c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA16.tiff","checksum":"1220b4c02442c26629d8d0064ce28bc8750d685061207bcbc8db6908ee00f388fe76"},{"id":"CA17","bounds":[170.4246231,-44.7167668,170.7399307,-44.3865686],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA17.json","itemChecksum":"12202f47949116ab1693bc65a0ff79a3c11dcf07bef6dc3277ba35ae85619113747a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA17.tiff","checksum":"122041cc888cd626f3a8f7a3da3bee915d28c3c929ed7d40250477601e9579ebea8b"},{"id":"CA18","bounds":[170.7273549,-44.7223939,171.0410847,-44.392926],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA18.json","itemChecksum":"1220740186209530463b3dea28448cc1f8cfee827c4314ef368b166785e2f8c69b45","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA18.tiff","checksum":"1220951339a252d33b1ad70495c7b184090a24141817fcc4cb5d85da1803aa673a98"},{"id":"CA19","bounds":[171.0301818,-44.7272183,171.3423195,-44.3984903],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA19.json","itemChecksum":"122051856e37134bb31c11c5f7054a6cdee021eecb5bd759d8d7d9674445a0eef702","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CA19.tiff","checksum":"1220955a791a8100d3dbff6920927af1fe1e02d90b68a72081760b78f458e5d3b967"},{"id":"CB08","bounds":[167.6767295,-44.952977,168.0076944,-44.6165292],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB08.json","itemChecksum":"1220744f9b21c943462d6817e789d4b05e985d3288ef64d17538e9ac85f502a9745a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB08.tiff","checksum":"1220f15fd93003e821cb032e055d6a67255e7d3b4e2c7ac2169ed4522ed881309b82"},{"id":"CB09","bounds":[167.9797132,-44.9659338,168.3092153,-44.6301342],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB09.json","itemChecksum":"1220e55d7d83443df4706e752cf2147e08b98bc3b20b8f212e089ef1ac7abe69e686","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB09.tiff","checksum":"122088a3103dddfcf38526fd75620f1e66ecabfa54ba6c1ca275ecbd36b3c4a5376d"},{"id":"CB11","bounds":[168.5863022,-44.9894378,168.9128292,-44.6549654],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB11.json","itemChecksum":"1220b01065d3d0a896b3a8c4e072b0e676b3238c8d028614da8de15ec90ebb009809","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB11.tiff","checksum":"12209c6a2b66f928214b8b595a6f26adbb2eeefb44627f0bec6ce92e74c16ad69909"},{"id":"CB12","bounds":[168.8898824,-44.9999824,169.2148975,-44.6661888],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB12.json","itemChecksum":"122020ed89aa90ab3ea5eead93ed3544c056c814a6d31907a06cf74ec9764e9fbaeb","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB12.tiff","checksum":"1220ba4165140e5d0457b93000712dc2895015d95b590399820d61557f29c9027c5f"},{"id":"CB13","bounds":[169.1936363,-45.0097204,169.5171235,-44.6766159],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB13.json","itemChecksum":"1220738d0be49d00e301785a2f255bfeb704211586afbb1f6c977d973a033c6ebdfc","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB13.tiff","checksum":"122059dec695cda4e467ec42283484af03278b268253ae14e3a78133c9b99924d220"},{"id":"CB14","bounds":[169.4975511,-45.0186507,169.8194948,-44.6862453],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB14.json","itemChecksum":"1220a571723d4527ee613ce8f2eacce609f15bd626d5c59fbd3279172f0ced7642bc","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB14.tiff","checksum":"12205a7cb2622bdf25563fa1494a30001acd6ac343f028675a68504360208d9a9f09"},{"id":"CB15","bounds":[169.8016142,-45.0267724,170.1219988,-44.695076],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB15.json","itemChecksum":"1220d2051e646696498e27d307a0b509a2c23e412232af9342c0492b6e15ea085152","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB15.tiff","checksum":"1220758a32b88a1fe3f652ee731b8a41b4ec0e53e9671000a3f359349aef2d9a0d31"},{"id":"CB16","bounds":[170.1058128,-45.0340846,170.4246231,-44.7031071],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB16.json","itemChecksum":"12203a84aae1804b3f6ce71a7eecc5e201903847d6e374e89d97cd996134c3752d58","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB16.tiff","checksum":"12201649f20631c5bbd7de36e9d1352557d15290d381cc85a28d6a22fdcca4b98f9b"},{"id":"CB17","bounds":[170.4101341,-45.0405864,170.7273549,-44.7103377],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB17.json","itemChecksum":"122085bedbbc0cf2e04444081da51afb8a1021bb0e9267b72a5b4cc86c52cb78251f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB17.tiff","checksum":"12207ddf05ed80344424dc2c2dddc38226816ba3bbcf8033d38837c5814eebed6b93"},{"id":"CB18","bounds":[170.7145653,-45.046277,171.0301818,-44.7167668],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB18.json","itemChecksum":"12205359a6a72b093b13714631f962417421d8958d53fff2c99d0f2361c2dc87cc85","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB18.tiff","checksum":"1220f48fc3f2653c5f7c2df7f00fdeba265f5e7e712a5476fc18b141450837987733"},{"id":"CB19","bounds":[171.0190935,-45.0511559,171.3330912,-44.7223939],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB19.json","itemChecksum":"12205771f5430f4e4dad695a0be029ad045eb27b0eece63f337210e370e5068aae31","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CB19.tiff","checksum":"1220842d1779db5d0a3e1429f55c01741b24103108fc4c3de6ef6a21c0ed2ad04da4"},{"id":"CC07","bounds":[167.3421213,-45.2618746,167.6767295,-44.924661],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC07.json","itemChecksum":"1220978df1b1e96e91c0bad4332b7bfcb16ccb2bdbaf06244e7a427ad72efec747e3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC07.tiff","checksum":"12200c4acf0353316bde0b75faa807f13ef5b3a5d8a36f39003f82ed2806c7c70aa8"},{"id":"CC08","bounds":[167.6465745,-45.2757875,167.9797132,-44.9392189],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC08.json","itemChecksum":"1220adb1f5fb57c3972214b526c84e81827bce759fb8cbabeb0c6977983e7edeae49","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC08.tiff","checksum":"12204ef9868c5c44d8e5cfcd76a00848a02dc5b929759ee7c7192dadd9f156472560"},{"id":"CC09","bounds":[167.9512562,-45.2888902,168.2829082,-44.952977],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC09.json","itemChecksum":"1220dfe49fec9ef4796587defc06be1ac7d8ac2b7d525959deec3b77315f2f28ed9c","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC09.tiff","checksum":"12200ccd4036513b5452ddbb9d0aa73ec7e422c8c99b146396eeb3d5e33fbd0395f5"},{"id":"CC10","bounds":[168.2561537,-45.3011812,168.5863022,-44.9659338],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC10.json","itemChecksum":"12205c1de318def14ee74f39fe585cc1c91d0ab4d4cce267490a37479f58df59cf8f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC10.tiff","checksum":"1220da380dde899856c3f7a8afb3e11a119d7a6ec2671ce359dcf4b5d7308af851f5"},{"id":"CC11","bounds":[168.5612542,-45.312659,168.8898824,-44.9780878],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC11.json","itemChecksum":"12204557cd0f3dba14818bca03e91aeccb5cb2b5a8e482f4bcd1ef07f9b5e56383c0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC11.tiff","checksum":"1220d4f495cf762d54f22d8b602794696d9a24c6867857e3117f16ed359d68d408cf"},{"id":"CC12","bounds":[168.8665449,-45.3233224,169.1936363,-44.9894378],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC12.json","itemChecksum":"122096cec1c7a28c95c68cf6d114a89732154a0523bea801f246e7995055a50234c6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC12.tiff","checksum":"122046681f33a5b699f5f8d8dccc18c8d52c6e972a7363bff2ca78867d374fe2ad2e"},{"id":"CC13","bounds":[169.1720129,-45.3331702,169.4975511,-44.9999824],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC13.json","itemChecksum":"1220c9e64f7fb82426273c656d0d2be35b27953b799781c0b758a4bc67150b53150d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC13.tiff","checksum":"1220b7f8a284b8a281608de17f5ea264ec925d8e83fc5a67cd313adabb488d078131"},{"id":"CC14","bounds":[169.4776451,-45.3422013,169.8016142,-45.0097204],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC14.json","itemChecksum":"12205a2cbfd2a7b9296ff353b47d00b5f3dca63a4241e7bdefdc677fd5a32438299e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC14.tiff","checksum":"122090147023e4329cf16f88cf91040ab2955fd2313691bdbf369cddcf6ccf6b165d"},{"id":"CC15","bounds":[169.7834288,-45.3504147,170.1058128,-45.0186507],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC15.json","itemChecksum":"1220229e72025a27239928dcc0db709c8a434942b0a46c35d30b95eba963ad500519","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC15.tiff","checksum":"1220ca546f8a75aad6fe185203d69dee7a1387d05c767c88f8309aa07585d98f14fe"},{"id":"CC16","bounds":[170.0893507,-45.3578094,170.4101341,-45.0267724],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC16.json","itemChecksum":"1220e5fba4698fbf91640f6d682049010c50495b7138b26c7a3a4056801772ee0320","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC16.tiff","checksum":"122040493276aa12b8f2de3f1c927a58fe75849d4789699964a3c1763b373e6440f0"},{"id":"CC17","bounds":[170.395398,-45.3643845,170.7145653,-45.0340846],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC17.json","itemChecksum":"12204f6bf9bca14fff902169709da5dcc6bb885f7ca30bbf553beda2559f341ee7ba","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC17.tiff","checksum":"1220dbfb16f1f0eccaecee3cfd31701dbabac7da4223cee05f190fa38d475ee830a7"},{"id":"CC18","bounds":[170.7015574,-45.3701394,171.0190935,-45.0405864],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC18.json","itemChecksum":"1220a3b683e0564b54dacb9915f454682dfec24dec679daef3baa8b4e4c53d287a2f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC18.tiff","checksum":"12202ea62eec09b6322200b9c8532dccdaca9691b1df4690b5d9f1a4f6ec8a87dbb8"},{"id":"CC19","bounds":[171.0078159,-45.3750734,171.3237058,-45.046277],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC19.json","itemChecksum":"12209f01d43942c7337aee7c8dc645a06c924c0b3af9ccb80c98037e831ff0c447df","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CC19.tiff","checksum":"1220a7dc6c7b6ddab162ca30d299919818f3b6477b21570f8bc6ba1e32c2ebbbb827"},{"id":"CD06","bounds":[167.0038014,-45.5696089,167.3421213,-45.2316244],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD06.json","itemChecksum":"1220c6e0576feba2baf7896059745029defa6cf7587e72f84e6187ff5f18ae191527","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD06.tiff","checksum":"12201ac7ca00e0b55f71b2dfd2056e9305db670337a625f71c93fa1f5f8fc67c12cb"},{"id":"CD07","bounds":[167.3097303,-45.5844961,167.6465745,-45.247153],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD07.json","itemChecksum":"12209cc25ce48ba137d4a17c563269efb6f25f70fb9800cb8e0a9a40cf0ad0b68e8f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD07.tiff","checksum":"12207ba1cbf47b36ed50300b868ff5e8988c9363024802c52acda72bb346de396b8f"},{"id":"CD08","bounds":[167.6159054,-45.5985655,167.9512562,-45.2618746],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD08.json","itemChecksum":"12208279da576e91eebab49b62d69254eb27b56900b15dbb04dcbe4c3cd6b7b53827","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD08.tiff","checksum":"12201929a4256c614269838b8b80c8f033a80f19b5e22ac6f0493fa71f606d0ecf01"},{"id":"CD09","bounds":[167.9223137,-45.6118157,168.2561537,-45.2757875],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD09.json","itemChecksum":"12206a169735db387eab5e10c40d95f2cec93debe680f9ef9ec1038d41343684a5de","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD09.tiff","checksum":"1220261ec3567c90e67392d819cbfe35116ac51e05cabe4b0af20cf0fefd6c90e2fd"},{"id":"CD10","bounds":[168.2289424,-45.6242451,168.5612542,-45.2888902],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD10.json","itemChecksum":"1220eb82f533d0a662fd3af9d3003ff473cc76984c2bc289ea42aaa0a61de4ef678e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD10.tiff","checksum":"1220d4f3fc27d7c127419c2c0940defef9eb95b7bcd46435af584911fc69c7a2bd80"},{"id":"CD11","bounds":[168.5357784,-45.6358523,168.8665449,-45.3011812],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD11.json","itemChecksum":"1220e76ebb104006c3038e77dd3dd5f116b5c796ec6950d699d6609ec7e24ad4bb12","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD11.tiff","checksum":"122019baec41e13f578cec394a527ab69c2d1222dca9a5952ec2f0366d3cb9155db7"},{"id":"CD12","bounds":[168.8428085,-45.6466359,169.1720129,-45.312659],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD12.json","itemChecksum":"1220b897199d49692ae74ea263d8c0992c85a8e7eb59126a2dc1a6265298ef165013","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD12.tiff","checksum":"1220b574d977737ac90bd98367ca71639a77eb8df45d81c1347b74ae8e4aef57ddba"},{"id":"CD13","bounds":[169.1500197,-45.6565948,169.4776451,-45.3233224],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD13.json","itemChecksum":"1220dccf85e20261c3f2dd544c87c21f6288767ebd23262f00b1f1bf1d9699a75a96","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD13.tiff","checksum":"1220112fa6643f820decc4c83341bcccddf1cf54926b499fb3b155de2e24ededfbd1"},{"id":"CD14","bounds":[169.4573986,-45.6657277,169.7834288,-45.3331702],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD14.json","itemChecksum":"12205daad5da6700ef881acd6820c3cfd6977c7c37452cb9cdbd423db76c90c5d13f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD14.tiff","checksum":"12208c035146a5375c96791e5f80c9d5663c870604f406270d8707850c880869c7ac"},{"id":"CD15","bounds":[169.7649321,-45.6740338,170.0893507,-45.3422013],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD15.json","itemChecksum":"122076ed1efc45462ee21173ab34f05b92f8431f04a2f704e1ffefc033d3877573e5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD15.tiff","checksum":"1220cbd27f6e9788068e6d89465bc207e08aeaeb0190dc4324f7d8e376c6beaa72b3"},{"id":"CD16","bounds":[170.0726068,-45.6815119,170.395398,-45.3504147],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD16.json","itemChecksum":"122008f7f4c09f5f24b7711069e12d54b001a05b136e008fb6b6be24f1ddb096d7f0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD16.tiff","checksum":"122025d0f10de037d1f72d734ee6f9d77577cbf6557285ea463570b87953bc1489c6"},{"id":"CD17","bounds":[170.3804094,-45.6881613,170.7015574,-45.3578094],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD17.json","itemChecksum":"1220178109a0a6bf82e814739b76b1b3cce5bb5a831cca5ff2c49e75af0ae128fbb9","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD17.tiff","checksum":"122098e9323ec31b7586762b3fb728867583fe9fda986ea8ad207c34707285cdb981"},{"id":"CD18","bounds":[170.6883266,-45.6939812,171.0078159,-45.3643845],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD18.json","itemChecksum":"1220f66cc58b5c1223bbe015e1886ff4032b7c69a01cb182723d24033bd582110b20","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CD18.tiff","checksum":"12201455ca22541a5cc44b9a280aff5165281394ea7012c8fbc1fc9f07187be7ade1"},{"id":"CE06","bounds":[166.9691106,-45.8920282,167.3097303,-45.5539057],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE06.json","itemChecksum":"12203b5ed9bfeed18ad709b8fc3e8ec99b7808b68c3b0e3a50927d58f4ffd6951f50","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE06.tiff","checksum":"1220d1c366c7e74a4616e9fc4cb7ccf28e1f4755c7be21d77a80b66233959d543c2f"},{"id":"CE07","bounds":[167.2767852,-45.9070828,167.6159054,-45.5696089],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE07.json","itemChecksum":"1220070678fa4cdab3001a94d15e88f5809eb5f68cf7d40f329bd168e63d79724b61","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE07.tiff","checksum":"12201813e40538f7097a1654829c1ae4729939b91f22917f0a24c3ddbfcfafa9a686"},{"id":"CE08","bounds":[167.5847112,-45.9213106,167.9223137,-45.5844961],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE08.json","itemChecksum":"12200f94e98f0a5cb186d7110fd81dddc325b467c0b04e9adaf706f93dc0d4e1d5b7","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE08.tiff","checksum":"12209790393b3785d136e8547d8ed26bc57881fadf7bf007deba341e0cca85f0c669"},{"id":"CE09","bounds":[167.8928755,-45.93471,168.2289424,-45.5985655],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE09.json","itemChecksum":"1220472023ec66b9200c916168e3815eb30e379cfbd4cec431938ea0b575b635c896","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE09.tiff","checksum":"1220c91120fe0c3e7632194ac7f60e09ebe7ae3d826b382901c2307d1c6f18bd4713"},{"id":"CE10","bounds":[168.2012648,-45.9472794,168.5357784,-45.6118157],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE10.json","itemChecksum":"1220d9269ebcadc58a9da6a2212bbea4bbd5e1dc45ac20a18538a18f47598ee755ab","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE10.tiff","checksum":"1220919a9000305a079a49580531a4076d9667ce17d508d095573dbf4978b51fa1fe"},{"id":"CE11","bounds":[168.5098657,-45.9590173,168.8428085,-45.6242451],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE11.json","itemChecksum":"1220c415ebfed390cf9183565cbfb4dd17bf92ad5054a4dc8c2414d9b6f361f10d3f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE11.tiff","checksum":"1220b5ff1941f266b950a1bdc1662018b22a558811343876517750c8f17dadaaee05"},{"id":"CE12","bounds":[168.8186648,-45.9699226,169.1500197,-45.6358523],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE12.json","itemChecksum":"1220064168bea8f40a4f9bab135cae00b7eed24213826bffa4b8ac980aa6df0f4d06","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE12.tiff","checksum":"1220128eeafe7170e133e913c07191f3872547919de7625e9f5142070fbd19217ed2"},{"id":"CE13","bounds":[169.1276489,-45.9799938,169.4573986,-45.6466359],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE13.json","itemChecksum":"12207d786b0339a39187b900c9ece77fe46f70d3c9bddd220d9ea71fd94f02d6bb87","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE13.tiff","checksum":"12207139b0acda044158fa7ca6d202b40f97a0c5c89fa0a5072a2dcfdc888b0a235a"},{"id":"CE14","bounds":[169.4368043,-45.9892298,169.7649321,-45.6565948],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE14.json","itemChecksum":"1220d30af518fded34bd99e813d5ed145818c7576dbdc0700c4362cc4741a887d698","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE14.tiff","checksum":"1220ec0f20885a708184ce70c9c7d8d29c6e80d18c89db903b2d67998ee2f591d561"},{"id":"CE15","bounds":[169.7461175,-45.9976295,170.0726068,-45.6657277],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE15.json","itemChecksum":"122010b8c154a4d9220e21bf9d45e2aba9cd082717a8c88f9549533e0c5be03ece0e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE15.tiff","checksum":"1220d391caff2480cdf500f66a49968a0865e44302df1dfcc316d3533dfaae288e63"},{"id":"CE16","bounds":[170.055575,-46.0051921,170.3804094,-45.6740338],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE16.json","itemChecksum":"1220176559a76c67ff1598ca897bf2189b16a4f74c5f78b2c7f45abefbdb428a69e0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE16.tiff","checksum":"1220f5d184548910ddbd8e7e189f679581ab210caa40c2ce3011be66e924693dc920"},{"id":"CE17","bounds":[170.3651631,-46.0119166,170.6883266,-45.6815119],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE17.json","itemChecksum":"12202429043f0ed2001ad9a7c0baa5906d6999ad9c007001f3111fdf075b9327c688","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE17.tiff","checksum":"1220875fa7bcecebcae2ea5dc00873268fb6753664635063e6ce160e878fb7d96699"},{"id":"CE18","bounds":[170.6748682,-46.0178022,170.9963449,-45.6881613],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE18.json","itemChecksum":"1220aad16cf2359e9a30a95c3a09e79a65e47a9a543bd10516ca72225bedeeab9953","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CE18.tiff","checksum":"1220213cd98ea148fa55d74fb4c337cdc1e2ed7fed0a3c8d2f7fbbade30b9dcce031"},{"id":"CF07","bounds":[167.2432744,-46.2296345,167.5847112,-45.8920282],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF07.json","itemChecksum":"1220ab803e534e804b655fa087433d9bc4c63dbd0e033d4da174d45a87082a9f0212","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF07.tiff","checksum":"1220851868bccf4a456bfd7d774e9b70b85327d3f5279acd56eaaef7e7d66a737b1d"},{"id":"CF08","bounds":[167.552981,-46.2440224,167.8928755,-45.9070828],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF08.json","itemChecksum":"1220f6bf6da309c2cf57cf1766b5de1876354e091a235971db484493266b9afe35e5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF08.tiff","checksum":"12200178c6de02c12ebb56c1214920c7c7e1f287ac4c2d85a83fe97129836b4e9ce6"},{"id":"CF09","bounds":[167.862931,-46.2575727,168.2012648,-45.9213106],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF09.json","itemChecksum":"1220390773315e70627f47cd0064569996fed4d871e4a9cfcabf0e0b96e99889dd7e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF09.tiff","checksum":"122044d9a5230f0d29b6580450e2d238f8b174784c5802fa3446f85a7e3c6f85e9b3"},{"id":"CF10","bounds":[168.1731108,-46.2702838,168.5098657,-45.93471],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF10.json","itemChecksum":"12208b06a75694c267d56ab0da68def920c01bc6f4c2b93a22c5e95572bdcb959fe6","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF10.tiff","checksum":"12207f6bdb4249892fc6f19b6d6de83a352447c020a63431a11f47850795e8089c39"},{"id":"CF11","bounds":[168.4835067,-46.2821541,168.8186648,-45.9472794],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF11.json","itemChecksum":"12202d79fce55499452a4007851c0ecc7d65bf0f5442ec57e3756e1bdccdff59dc9f","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF11.tiff","checksum":"1220db300d1d60f1b96528cc8972fbd4b845eec4e3d07550d3e91cdd986d559b532b"},{"id":"CF12","bounds":[168.7941052,-46.2931823,169.1276489,-45.9590173],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF12.json","itemChecksum":"12208acadb35f8c44f3498ee0c72b326580211179b442bf17b55d1f37a0659da81a0","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF12.tiff","checksum":"12205864c194865d9f3e62c29717324a378a14954b6546cf6d62babd39702f3ef166"},{"id":"CF13","bounds":[169.1048925,-46.3033671,169.4368043,-45.9699226],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF13.json","itemChecksum":"1220a9d3984dbc01e7aebd5710a70766964cf3b0651ffa107a2302aabd44c4fd74e1","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF13.tiff","checksum":"12205fd95ecb76d813a187d4fc5a878c3420fb55a828dfbfcba9a6be9c0cf1731562"},{"id":"CF14","bounds":[169.4158548,-46.3127073,169.7461175,-45.9799938],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF14.json","itemChecksum":"1220e376536534b01572ac96ec96a170c39f7983478274045eb6758f0911fd656696","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF14.tiff","checksum":"12201148af95e9af55211b31baa5c937bc8590ceeb1392e2775716bdb35f6c1eb28b"},{"id":"CF15","bounds":[169.7269783,-46.321202,170.055575,-45.9892298],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF15.json","itemChecksum":"1220e8a610e4aa90904e1c88d6e27f6c310c85dd782f4001604f1decf7c930c9bbae","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF15.tiff","checksum":"1220fe80031a73c2c2f64373ed0cec78c574f82f09a2e636e5cb951ef5488beba3a0"},{"id":"CF16","bounds":[170.0382492,-46.3288499,170.3651631,-45.9976295],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF16.json","itemChecksum":"1220b325c3410286a067169d5962b6995ca2c35ff73127ea4e1a31a0a14826328156","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CF16.tiff","checksum":"12209369ea007490c47e6a5d934dcd55d732dcbe3bbb330a06c04eed19d988260215"},{"id":"CG08","bounds":[167.5207033,-46.5667007,167.862931,-46.2296345],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG08.json","itemChecksum":"1220c459efb30473ac7e7327a678b2fcd0562f63d521c7cd057bf742a89aba8dec0e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG08.tiff","checksum":"122056bc62d08c605046e9e74e4c51e5e028eba36dd822c96017fc5609060577e5e7"},{"id":"CG09","bounds":[167.8324695,-46.5804037,168.1731108,-46.2440224],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG09.json","itemChecksum":"1220eeb0384b3e0f2a426a564b8221188430ef39180868ad5c598f4529fd16bc4f98","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG09.tiff","checksum":"1220f25b0bebb8d3c3a995dfe6c7b88624cf32ee055f66ca8661ca2243d99c5e1a86"},{"id":"CG10","bounds":[168.1444704,-46.593258,168.4835067,-46.2575727],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG10.json","itemChecksum":"1220df4ea320df082bc75da8d1eda27ab5ebdc8c2a0bea4402c4ebf6a8ec68a2fb5b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG10.tiff","checksum":"1220a03365527d3edde1b5780c415838d9eb297231edec7aec238a90524ec97e855f"},{"id":"CG11","bounds":[168.4566921,-46.6052622,168.7941052,-46.2702838],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG11.json","itemChecksum":"1220040396016d623d8aa25c98f5f558097415e6ed7ab9d7c312ebc9ce5f71b6d3fd","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG11.tiff","checksum":"122007bcb6e04be3a7658405bd12ed7c8303195659dec52d008d86c10a4ae55b7f9b"},{"id":"CG12","bounds":[168.7691208,-46.6164148,169.1048925,-46.2821541],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG12.json","itemChecksum":"122080216056578a425f1746aa805162c4f02b8bb0dbafc2e18649015d22887d612a","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG12.tiff","checksum":"1220e0a646d546023651dd39992f8edb3608f847b728c3ead7b2b0db041f7b258988"},{"id":"CG13","bounds":[169.0817423,-46.6267146,169.4158548,-46.2931823],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG13.json","itemChecksum":"12200d3ef9806fd545261795564542b2065225d09f4197615a1cdc23355b91e7ddc5","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG13.tiff","checksum":"122061edcf50931c69b096037f668cd3c0afab413e9b79a79db90a9e6e570b488fa2"},{"id":"CG14","bounds":[169.3945426,-46.6361603,169.7269783,-46.3033671],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG14.json","itemChecksum":"1220da352a862288ad877107cf0feea4f8048d0a2d2d71a1ab5b66e6d2bbcd2e5749","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG14.tiff","checksum":"12208f3841e2b20d7db59909680ffddb6704aa1122e50b2c81716090acdbce52fd80"},{"id":"CG15","bounds":[169.7075076,-46.6447509,170.0382492,-46.3127073],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG15.json","itemChecksum":"12200afdb9c5c78b476f39759a14f6e6266f7310a0ad58c76ce051548bdae123e62e","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CG15.tiff","checksum":"12205a1a9e988259508e802d2888dcfd6e608d9e8827de1ed5808186fc92a8c171b8"},{"id":"CH09","bounds":[167.8014798,-46.9032025,168.1444704,-46.5667007],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH09.json","itemChecksum":"1220951ef37b98eb49ff1a74c1d90913b497a0256dfe480f43ac26969fd8eeeab93b","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH09.tiff","checksum":"12200d2f25a54ed286695e9b303905d1b8daec7f959c2c7c4882be0ea38875f96b80"},{"id":"CH10","bounds":[168.1153331,-46.9162018,168.4566921,-46.5804037],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH10.json","itemChecksum":"1220be4af94055a7f28bd4df604295bddf1fc3412f4bc30edbf82068d680a3915bfe","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH10.tiff","checksum":"1220a10677ee0b82c667f55c32c1057c7aff49f8e73b81fe444bca0c22e5405aef1e"},{"id":"CH11","bounds":[168.429412,-46.9283415,168.7691208,-46.593258],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH11.json","itemChecksum":"12202d2dccd92507ad78d790475c87ae959f098533e51352decb63c342c580b25435","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH11.tiff","checksum":"1220349f79c7016f128e69c646a15c30bcb818cc4fa5cf6c5d9d75ee637d4d5cb0eb"},{"id":"CH12","bounds":[168.7437023,-46.93962,169.0817423,-46.6052622],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH12.json","itemChecksum":"12206031eeb641af775594a2494654f0f672515099b9625db2ffcb71df7e464e20f3","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH12.tiff","checksum":"122070c1620ebbbe0fa0d40607ec2e5e94b9562ed1dfb9f21313b549dc88da58ff74"},{"id":"CH13","bounds":[169.0581896,-46.9500361,169.3945426,-46.6164148],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH13.json","itemChecksum":"1220693c1e85e0117c7c9a43b60759b10a860177b534f68369f94475115b1f3f1581","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CH13.tiff","checksum":"12206ff1f6e5eea6b2cee6129292e25294a494bf5d5335b8d09bf6058e2ac59f6651"},{"id":"CJ09","bounds":[167.7699505,-47.225969,168.1153331,-46.8893451],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CJ09.json","itemChecksum":"1220ad80ee0a9cd18a78121a837bf69d539b29c681cbbf490fd32cdeefab08347c61","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CJ09.tiff","checksum":"122012e8a378c4be959218fc3d44c2219c302c8fa3bace5bf9066c958103a567ddad"},{"id":"CJ10","bounds":[168.085688,-47.239115,168.429412,-46.9032025],"itemUrl":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CJ10.json","itemChecksum":"12203209cf334d9505afef22bcad53a6789c7fbf8d0b171821085b3a8b43d73b9e6d","url":"https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/CJ10.tiff","checksum":"1220aae1d5807737dc5dfe238b59ff76fb101bc69879c8e93026b7d2bf8923a230eb"}]');
function U1(e) {
  e("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), e("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), e("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
  for (var a = 1; a <= 60; ++a)
    e("EPSG:" + (32600 + a), "+proj=utm +zone=" + a + " +datum=WGS84 +units=m"), e("EPSG:" + (32700 + a), "+proj=utm +zone=" + a + " +south +datum=WGS84 +units=m");
  e("EPSG:5041", "+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"), e("EPSG:5042", "+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"), e.WGS84 = e["EPSG:4326"], e["EPSG:3785"] = e["EPSG:3857"], e.GOOGLE = e["EPSG:3857"], e["EPSG:900913"] = e["EPSG:3857"], e["EPSG:102113"] = e["EPSG:3857"];
}
var ue = 1, be = 2, Be = 3, I1 = 4, qa = 5, Bt = 6378137, T1 = 6356752314e-3, kt = 0.0066943799901413165, Fe = 484813681109536e-20, _ = Math.PI / 2, N1 = 0.16666666666666666, j1 = 0.04722222222222222, R1 = 0.022156084656084655, y = 1e-10, U = 0.017453292519943295, $ = 57.29577951308232, P = Math.PI / 4, We = Math.PI * 2, I = 3.14159265359, K = {};
K.greenwich = 0;
K.lisbon = -9.131906111111;
K.paris = 2.337229166667;
K.bogota = -74.080916666667;
K.madrid = -3.687938888889;
K.rome = 12.452333333333;
K.bern = 7.439583333333;
K.jakarta = 106.807719444444;
K.ferro = -17.666666666667;
K.brussels = 4.367975;
K.stockholm = 18.058277777778;
K.athens = 23.7163375;
K.oslo = 10.722916666667;
var O1 = {
  mm: { to_meter: 1e-3 },
  cm: { to_meter: 0.01 },
  ft: { to_meter: 0.3048 },
  "us-ft": { to_meter: 1200 / 3937 },
  fath: { to_meter: 1.8288 },
  kmi: { to_meter: 1852 },
  "us-ch": { to_meter: 20.1168402336805 },
  "us-mi": { to_meter: 1609.34721869444 },
  km: { to_meter: 1e3 },
  "ind-ft": { to_meter: 0.30479841 },
  "ind-yd": { to_meter: 0.91439523 },
  mi: { to_meter: 1609.344 },
  yd: { to_meter: 0.9144 },
  ch: { to_meter: 20.1168 },
  link: { to_meter: 0.201168 },
  dm: { to_meter: 0.1 },
  in: { to_meter: 0.0254 },
  "ind-ch": { to_meter: 20.11669506 },
  "us-in": { to_meter: 0.025400050800101 },
  "us-yd": { to_meter: 0.914401828803658 }
}, St = /[\s_\-\/\(\)]/g;
function re(e, a) {
  if (e[a])
    return e[a];
  for (var t = Object.keys(e), s = a.toLowerCase().replace(St, ""), n = -1, i, d; ++n < t.length; )
    if (i = t[n], d = i.toLowerCase().replace(St, ""), d === s)
      return e[i];
}
function Va(e) {
  var a = {}, t = e.split("+").map(function(o) {
    return o.trim();
  }).filter(function(o) {
    return o;
  }).reduce(function(o, c) {
    var r = c.split("=");
    return r.push(!0), o[r[0].toLowerCase()] = r[1], o;
  }, {}), s, n, i, d = {
    proj: "projName",
    datum: "datumCode",
    rf: function(o) {
      a.rf = parseFloat(o);
    },
    lat_0: function(o) {
      a.lat0 = o * U;
    },
    lat_1: function(o) {
      a.lat1 = o * U;
    },
    lat_2: function(o) {
      a.lat2 = o * U;
    },
    lat_ts: function(o) {
      a.lat_ts = o * U;
    },
    lon_0: function(o) {
      a.long0 = o * U;
    },
    lon_1: function(o) {
      a.long1 = o * U;
    },
    lon_2: function(o) {
      a.long2 = o * U;
    },
    alpha: function(o) {
      a.alpha = parseFloat(o) * U;
    },
    gamma: function(o) {
      a.rectified_grid_angle = parseFloat(o) * U;
    },
    lonc: function(o) {
      a.longc = o * U;
    },
    x_0: function(o) {
      a.x0 = parseFloat(o);
    },
    y_0: function(o) {
      a.y0 = parseFloat(o);
    },
    k_0: function(o) {
      a.k0 = parseFloat(o);
    },
    k: function(o) {
      a.k0 = parseFloat(o);
    },
    a: function(o) {
      a.a = parseFloat(o);
    },
    b: function(o) {
      a.b = parseFloat(o);
    },
    r: function(o) {
      a.a = a.b = parseFloat(o);
    },
    r_a: function() {
      a.R_A = !0;
    },
    zone: function(o) {
      a.zone = parseInt(o, 10);
    },
    south: function() {
      a.utmSouth = !0;
    },
    towgs84: function(o) {
      a.datum_params = o.split(",").map(function(c) {
        return parseFloat(c);
      });
    },
    to_meter: function(o) {
      a.to_meter = parseFloat(o);
    },
    units: function(o) {
      a.units = o;
      var c = re(O1, o);
      c && (a.to_meter = c.to_meter);
    },
    from_greenwich: function(o) {
      a.from_greenwich = o * U;
    },
    pm: function(o) {
      var c = re(K, o);
      a.from_greenwich = (c || parseFloat(o)) * U;
    },
    nadgrids: function(o) {
      o === "@null" ? a.datumCode = "none" : a.nadgrids = o;
    },
    axis: function(o) {
      var c = "ewnsud";
      o.length === 3 && c.indexOf(o.substr(0, 1)) !== -1 && c.indexOf(o.substr(1, 1)) !== -1 && c.indexOf(o.substr(2, 1)) !== -1 && (a.axis = o);
    },
    approx: function() {
      a.approx = !0;
    },
    over: function() {
      a.over = !0;
    }
  };
  for (s in t)
    n = t[s], s in d ? (i = d[s], typeof i == "function" ? i(n) : a[i] = n) : a[s] = n;
  return typeof a.datumCode == "string" && a.datumCode !== "WGS84" && (a.datumCode = a.datumCode.toLowerCase()), a.projStr = e, a;
}
class hs {
  static getId(a) {
    const t = a.find((s) => Array.isArray(s) && s[0] === "ID");
    return t && t.length >= 3 ? {
      authority: t[1],
      code: parseInt(t[2], 10)
    } : null;
  }
  static convertUnit(a, t = "unit") {
    if (!a || a.length < 3)
      return { type: t, name: "unknown", conversion_factor: null };
    const s = a[1], n = parseFloat(a[2]) || null, i = a.find((o) => Array.isArray(o) && o[0] === "ID"), d = i ? {
      authority: i[1],
      code: parseInt(i[2], 10)
    } : null;
    return {
      type: t,
      name: s,
      conversion_factor: n,
      id: d
    };
  }
  static convertAxis(a) {
    const t = a[1] || "Unknown";
    let s;
    const n = t.match(/^\((.)\)$/);
    if (n) {
      const r = n[1].toUpperCase();
      if (r === "E") s = "east";
      else if (r === "N") s = "north";
      else if (r === "U") s = "up";
      else if (a[2]) s = a[2];
      else throw new Error(`Unknown axis abbreviation: ${r}`);
    } else
      s = a[2] || "unknown";
    const i = a.find((r) => Array.isArray(r) && r[0] === "ORDER"), d = i ? parseInt(i[1], 10) : null, o = a.find(
      (r) => Array.isArray(r) && (r[0] === "LENGTHUNIT" || r[0] === "ANGLEUNIT" || r[0] === "SCALEUNIT")
    ), c = this.convertUnit(o);
    return {
      name: t,
      direction: s,
      // Use the valid PROJJSON direction value
      unit: c,
      order: d
    };
  }
  static extractAxes(a) {
    return a.filter((t) => Array.isArray(t) && t[0] === "AXIS").map((t) => this.convertAxis(t)).sort((t, s) => (t.order || 0) - (s.order || 0));
  }
  static convert(a, t = {}) {
    switch (a[0]) {
      case "PROJCRS":
        t.type = "ProjectedCRS", t.name = a[1], t.base_crs = a.find((h) => Array.isArray(h) && h[0] === "BASEGEOGCRS") ? this.convert(a.find((h) => Array.isArray(h) && h[0] === "BASEGEOGCRS")) : null, t.conversion = a.find((h) => Array.isArray(h) && h[0] === "CONVERSION") ? this.convert(a.find((h) => Array.isArray(h) && h[0] === "CONVERSION")) : null;
        const s = a.find((h) => Array.isArray(h) && h[0] === "CS");
        s && (t.coordinate_system = {
          type: s[1],
          axis: this.extractAxes(a)
        });
        const n = a.find((h) => Array.isArray(h) && h[0] === "LENGTHUNIT");
        if (n) {
          const h = this.convertUnit(n);
          t.coordinate_system.unit = h;
        }
        t.id = this.getId(a);
        break;
      case "BASEGEOGCRS":
      case "GEOGCRS":
      case "GEODCRS":
        t.type = a[0] === "GEODCRS" ? "GeodeticCRS" : "GeographicCRS", t.name = a[1];
        const i = a.find(
          (h) => Array.isArray(h) && (h[0] === "DATUM" || h[0] === "ENSEMBLE")
        );
        if (i) {
          const h = this.convert(i);
          i[0] === "ENSEMBLE" ? t.datum_ensemble = h : t.datum = h;
          const u = a.find((m) => Array.isArray(m) && m[0] === "PRIMEM");
          u && u[1] !== "Greenwich" && (h.prime_meridian = {
            name: u[1],
            longitude: parseFloat(u[2])
          });
        }
        t.coordinate_system = {
          type: "ellipsoidal",
          axis: this.extractAxes(a)
        }, t.id = this.getId(a);
        break;
      case "DATUM":
        t.type = "GeodeticReferenceFrame", t.name = a[1], t.ellipsoid = a.find((h) => Array.isArray(h) && h[0] === "ELLIPSOID") ? this.convert(a.find((h) => Array.isArray(h) && h[0] === "ELLIPSOID")) : null;
        break;
      case "ENSEMBLE":
        t.type = "DatumEnsemble", t.name = a[1], t.members = a.filter((h) => Array.isArray(h) && h[0] === "MEMBER").map((h) => ({
          type: "DatumEnsembleMember",
          name: h[1],
          id: this.getId(h)
          // Extract ID as { authority, code }
        }));
        const d = a.find((h) => Array.isArray(h) && h[0] === "ENSEMBLEACCURACY");
        d && (t.accuracy = parseFloat(d[1]));
        const o = a.find((h) => Array.isArray(h) && h[0] === "ELLIPSOID");
        o && (t.ellipsoid = this.convert(o)), t.id = this.getId(a);
        break;
      case "ELLIPSOID":
        t.type = "Ellipsoid", t.name = a[1], t.semi_major_axis = parseFloat(a[2]), t.inverse_flattening = parseFloat(a[3]), a.find((h) => Array.isArray(h) && h[0] === "LENGTHUNIT") && this.convert(a.find((h) => Array.isArray(h) && h[0] === "LENGTHUNIT"), t);
        break;
      case "CONVERSION":
        t.type = "Conversion", t.name = a[1], t.method = a.find((h) => Array.isArray(h) && h[0] === "METHOD") ? this.convert(a.find((h) => Array.isArray(h) && h[0] === "METHOD")) : null, t.parameters = a.filter((h) => Array.isArray(h) && h[0] === "PARAMETER").map((h) => this.convert(h));
        break;
      case "METHOD":
        t.type = "Method", t.name = a[1], t.id = this.getId(a);
        break;
      case "PARAMETER":
        t.type = "Parameter", t.name = a[1], t.value = parseFloat(a[2]), t.unit = this.convertUnit(
          a.find(
            (h) => Array.isArray(h) && (h[0] === "LENGTHUNIT" || h[0] === "ANGLEUNIT" || h[0] === "SCALEUNIT")
          )
        ), t.id = this.getId(a);
        break;
      case "BOUNDCRS":
        t.type = "BoundCRS";
        const c = a.find((h) => Array.isArray(h) && h[0] === "SOURCECRS");
        if (c) {
          const h = c.find((u) => Array.isArray(u));
          t.source_crs = h ? this.convert(h) : null;
        }
        const r = a.find((h) => Array.isArray(h) && h[0] === "TARGETCRS");
        if (r) {
          const h = r.find((u) => Array.isArray(u));
          t.target_crs = h ? this.convert(h) : null;
        }
        const l = a.find((h) => Array.isArray(h) && h[0] === "ABRIDGEDTRANSFORMATION");
        l ? t.transformation = this.convert(l) : t.transformation = null;
        break;
      case "ABRIDGEDTRANSFORMATION":
        if (t.type = "Transformation", t.name = a[1], t.method = a.find((h) => Array.isArray(h) && h[0] === "METHOD") ? this.convert(a.find((h) => Array.isArray(h) && h[0] === "METHOD")) : null, t.parameters = a.filter((h) => Array.isArray(h) && (h[0] === "PARAMETER" || h[0] === "PARAMETERFILE")).map((h) => {
          if (h[0] === "PARAMETER")
            return this.convert(h);
          if (h[0] === "PARAMETERFILE")
            return {
              name: h[1],
              value: h[2],
              id: {
                authority: "EPSG",
                code: 8656
              }
            };
        }), t.parameters.length === 7) {
          const h = t.parameters[6];
          h.name === "Scale difference" && (h.value = Math.round((h.value - 1) * 1e12) / 1e6);
        }
        t.id = this.getId(a);
        break;
      case "AXIS":
        t.coordinate_system || (t.coordinate_system = { type: "unspecified", axis: [] }), t.coordinate_system.axis.push(this.convertAxis(a));
        break;
      case "LENGTHUNIT":
        const f = this.convertUnit(a, "LinearUnit");
        t.coordinate_system && t.coordinate_system.axis && t.coordinate_system.axis.forEach((h) => {
          h.unit || (h.unit = f);
        }), f.conversion_factor && f.conversion_factor !== 1 && t.semi_major_axis && (t.semi_major_axis = {
          value: t.semi_major_axis,
          unit: f
        });
        break;
      default:
        t.keyword = a[0];
        break;
    }
    return t;
  }
}
class D1 extends hs {
  static convert(a, t = {}) {
    return super.convert(a, t), t.coordinate_system && t.coordinate_system.subtype === "Cartesian" && delete t.coordinate_system, t.usage && delete t.usage, t;
  }
}
class F1 extends hs {
  static convert(a, t = {}) {
    super.convert(a, t);
    const s = a.find((i) => Array.isArray(i) && i[0] === "CS");
    s && (t.coordinate_system = {
      subtype: s[1],
      axis: this.extractAxes(a)
    });
    const n = a.find((i) => Array.isArray(i) && i[0] === "USAGE");
    if (n) {
      const i = n.find((c) => Array.isArray(c) && c[0] === "SCOPE"), d = n.find((c) => Array.isArray(c) && c[0] === "AREA"), o = n.find((c) => Array.isArray(c) && c[0] === "BBOX");
      t.usage = {}, i && (t.usage.scope = i[1]), d && (t.usage.area = d[1]), o && (t.usage.bbox = o.slice(1));
    }
    return t;
  }
}
function L1(e) {
  return e.find((a) => Array.isArray(a) && a[0] === "USAGE") ? "2019" : (e.find((a) => Array.isArray(a) && a[0] === "CS") || e[0] === "BOUNDCRS" || e[0] === "PROJCRS" || e[0] === "GEOGCRS", "2015");
}
function q1(e) {
  return (L1(e) === "2019" ? F1 : D1).convert(e);
}
function V1(e) {
  const a = e.toUpperCase();
  return a.includes("PROJCRS") || a.includes("GEOGCRS") || a.includes("BOUNDCRS") || a.includes("VERTCRS") || a.includes("LENGTHUNIT") || a.includes("ANGLEUNIT") || a.includes("SCALEUNIT") ? "WKT2" : (a.includes("PROJCS") || a.includes("GEOGCS") || a.includes("LOCAL_CS") || a.includes("VERT_CS") || a.includes("UNIT"), "WKT1");
}
var Je = 1, fs = 2, ls = 3, _a = 4, ms = 5, ct = -1, H1 = /\s/, $1 = /[A-Za-z]/, K1 = /[A-Za-z84_]/, Aa = /[,\]]/, us = /[\d\.E\-\+]/;
function oe(e) {
  if (typeof e != "string")
    throw new Error("not a string");
  this.text = e.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = Je;
}
oe.prototype.readCharicter = function() {
  var e = this.text[this.place++];
  if (this.state !== _a)
    for (; H1.test(e); ) {
      if (this.place >= this.text.length)
        return;
      e = this.text[this.place++];
    }
  switch (this.state) {
    case Je:
      return this.neutral(e);
    case fs:
      return this.keyword(e);
    case _a:
      return this.quoted(e);
    case ms:
      return this.afterquote(e);
    case ls:
      return this.number(e);
    case ct:
      return;
  }
};
oe.prototype.afterquote = function(e) {
  if (e === '"') {
    this.word += '"', this.state = _a;
    return;
  }
  if (Aa.test(e)) {
    this.word = this.word.trim(), this.afterItem(e);
    return;
  }
  throw new Error(`havn't handled "` + e + '" in afterquote yet, index ' + this.place);
};
oe.prototype.afterItem = function(e) {
  if (e === ",") {
    this.word !== null && this.currentObject.push(this.word), this.word = null, this.state = Je;
    return;
  }
  if (e === "]") {
    this.level--, this.word !== null && (this.currentObject.push(this.word), this.word = null), this.state = Je, this.currentObject = this.stack.pop(), this.currentObject || (this.state = ct);
    return;
  }
};
oe.prototype.number = function(e) {
  if (us.test(e)) {
    this.word += e;
    return;
  }
  if (Aa.test(e)) {
    this.word = parseFloat(this.word), this.afterItem(e);
    return;
  }
  throw new Error(`havn't handled "` + e + '" in number yet, index ' + this.place);
};
oe.prototype.quoted = function(e) {
  if (e === '"') {
    this.state = ms;
    return;
  }
  this.word += e;
};
oe.prototype.keyword = function(e) {
  if (K1.test(e)) {
    this.word += e;
    return;
  }
  if (e === "[") {
    var a = [];
    a.push(this.word), this.level++, this.root === null ? this.root = a : this.currentObject.push(a), this.stack.push(this.currentObject), this.currentObject = a, this.state = Je;
    return;
  }
  if (Aa.test(e)) {
    this.afterItem(e);
    return;
  }
  throw new Error(`havn't handled "` + e + '" in keyword yet, index ' + this.place);
};
oe.prototype.neutral = function(e) {
  if ($1.test(e)) {
    this.word = e, this.state = fs;
    return;
  }
  if (e === '"') {
    this.word = "", this.state = _a;
    return;
  }
  if (us.test(e)) {
    this.word = e, this.state = ls;
    return;
  }
  if (Aa.test(e)) {
    this.afterItem(e);
    return;
  }
  throw new Error(`havn't handled "` + e + '" in neutral yet, index ' + this.place);
};
oe.prototype.output = function() {
  for (; this.place < this.text.length; )
    this.readCharicter();
  if (this.state === ct)
    return this.root;
  throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
};
function X1(e) {
  var a = new oe(e);
  return a.output();
}
function ja(e, a, t) {
  Array.isArray(a) && (t.unshift(a), a = null);
  var s = a ? {} : e, n = t.reduce(function(i, d) {
    return ve(d, i), i;
  }, s);
  a && (e[a] = n);
}
function ve(e, a) {
  if (!Array.isArray(e)) {
    a[e] = !0;
    return;
  }
  var t = e.shift();
  if (t === "PARAMETER" && (t = e.shift()), e.length === 1) {
    if (Array.isArray(e[0])) {
      a[t] = {}, ve(e[0], a[t]);
      return;
    }
    a[t] = e[0];
    return;
  }
  if (!e.length) {
    a[t] = !0;
    return;
  }
  if (t === "TOWGS84") {
    a[t] = e;
    return;
  }
  if (t === "AXIS") {
    t in a || (a[t] = []), a[t].push(e);
    return;
  }
  Array.isArray(t) || (a[t] = {});
  var s;
  switch (t) {
    case "UNIT":
    case "PRIMEM":
    case "VERT_DATUM":
      a[t] = {
        name: e[0].toLowerCase(),
        convert: e[1]
      }, e.length === 3 && ve(e[2], a[t]);
      return;
    case "SPHEROID":
    case "ELLIPSOID":
      a[t] = {
        name: e[0],
        a: e[1],
        rf: e[2]
      }, e.length === 4 && ve(e[3], a[t]);
      return;
    case "EDATUM":
    case "ENGINEERINGDATUM":
    case "LOCAL_DATUM":
    case "DATUM":
    case "VERT_CS":
    case "VERTCRS":
    case "VERTICALCRS":
      e[0] = ["name", e[0]], ja(a, t, e);
      return;
    case "COMPD_CS":
    case "COMPOUNDCRS":
    case "FITTED_CS":
    // the followings are the crs defined in
    // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11
    case "PROJECTEDCRS":
    case "PROJCRS":
    case "GEOGCS":
    case "GEOCCS":
    case "PROJCS":
    case "LOCAL_CS":
    case "GEODCRS":
    case "GEODETICCRS":
    case "GEODETICDATUM":
    case "ENGCRS":
    case "ENGINEERINGCRS":
      e[0] = ["name", e[0]], ja(a, t, e), a[t].type = t;
      return;
    default:
      for (s = -1; ++s < e.length; )
        if (!Array.isArray(e[s]))
          return ve(e, a[t]);
      return ja(a, t, e);
  }
}
var Y1 = 0.017453292519943295;
function W(e) {
  return e * Y1;
}
function bs(e) {
  const a = (e.projName || "").toLowerCase().replace(/_/g, " ");
  e.long0 === void 0 && e.longc !== void 0 && (e.long0 = e.longc), !e.lat_ts && e.lat1 && (a === "stereographic south pole" || a === "polar stereographic (variant b)") ? (e.lat0 = W(e.lat1 > 0 ? 90 : -90), e.lat_ts = e.lat1, delete e.lat1) : !e.lat_ts && e.lat0 && (a === "polar stereographic" || a === "polar stereographic (variant a)") && (e.lat_ts = e.lat0, e.lat0 = W(e.lat0 > 0 ? 90 : -90), delete e.lat1);
}
function Et(e) {
  let a = { units: null, to_meter: void 0 };
  return typeof e == "string" ? (a.units = e.toLowerCase(), a.units === "metre" && (a.units = "meter"), a.units === "meter" && (a.to_meter = 1)) : e && e.name && (a.units = e.name.toLowerCase(), a.units === "metre" && (a.units = "meter"), a.to_meter = e.conversion_factor), a;
}
function At(e) {
  return typeof e == "object" ? e.value * e.unit.conversion_factor : e;
}
function Pt(e, a) {
  e.ellipsoid.radius ? (a.a = e.ellipsoid.radius, a.rf = 0) : (a.a = At(e.ellipsoid.semi_major_axis), e.ellipsoid.inverse_flattening !== void 0 ? a.rf = e.ellipsoid.inverse_flattening : e.ellipsoid.semi_major_axis !== void 0 && e.ellipsoid.semi_minor_axis !== void 0 && (a.rf = a.a / (a.a - At(e.ellipsoid.semi_minor_axis))));
}
function va(e, a = {}) {
  return !e || typeof e != "object" ? e : e.type === "BoundCRS" ? (va(e.source_crs, a), e.transformation && (e.transformation.method && e.transformation.method.name === "NTv2" ? a.nadgrids = e.transformation.parameters[0].value : a.datum_params = e.transformation.parameters.map((t) => t.value)), a) : (Object.keys(e).forEach((t) => {
    const s = e[t];
    if (s !== null)
      switch (t) {
        case "name":
          if (a.srsCode)
            break;
          a.name = s, a.srsCode = s;
          break;
        case "type":
          s === "GeographicCRS" ? a.projName = "longlat" : s === "GeodeticCRS" ? e.coordinate_system && e.coordinate_system.subtype === "Cartesian" ? a.projName = "geocent" : a.projName = "longlat" : s === "ProjectedCRS" && e.conversion && e.conversion.method && (a.projName = e.conversion.method.name);
          break;
        case "datum":
        case "datum_ensemble":
          s.ellipsoid && (a.ellps = s.ellipsoid.name, Pt(s, a)), s.prime_meridian && (a.from_greenwich = s.prime_meridian.longitude * Math.PI / 180);
          break;
        case "ellipsoid":
          a.ellps = s.name, Pt(s, a);
          break;
        case "prime_meridian":
          a.long0 = (s.longitude || 0) * Math.PI / 180;
          break;
        case "coordinate_system":
          if (s.axis) {
            const n = {
              east: "e",
              north: "n",
              west: "w",
              south: "s",
              up: "u",
              down: "d",
              geocentricx: "e",
              geocentricy: "n",
              geocentricz: "u"
            }, i = s.axis.map((d) => n[d.direction.toLowerCase()]);
            if (i.every(Boolean) && (a.axis = i.join(""), a.axis.length === 2 && (a.axis += "u")), s.unit) {
              const { units: d, to_meter: o } = Et(s.unit);
              a.units = d, a.to_meter = o;
            } else if (s.axis[0] && s.axis[0].unit) {
              const { units: d, to_meter: o } = Et(s.axis[0].unit);
              a.units = d, a.to_meter = o;
            }
          }
          break;
        case "id":
          s.authority && s.code && (a.title = s.authority + ":" + s.code);
          break;
        case "conversion":
          s.method && s.method.name && (a.projName = s.method.name), s.parameters && s.parameters.forEach((n) => {
            const i = n.name.toLowerCase().replace(/\s+/g, "_"), d = n.value;
            n.unit && n.unit.conversion_factor ? a[i] = d * n.unit.conversion_factor : n.unit === "degree" ? a[i] = d * Math.PI / 180 : a[i] = d;
          });
          break;
        case "unit":
          s.name && (a.units = s.name.toLowerCase(), a.units === "metre" && (a.units = "meter")), s.conversion_factor && (a.to_meter = s.conversion_factor);
          break;
        case "base_crs":
          va(s, a), a.datumCode = s.id ? s.id.authority + "_" + s.id.code : s.name;
          break;
      }
  }), a.latitude_of_false_origin !== void 0 && (a.lat0 = a.latitude_of_false_origin), a.longitude_of_false_origin !== void 0 && (a.long0 = a.longitude_of_false_origin), a.latitude_of_standard_parallel !== void 0 && (a.lat0 = a.latitude_of_standard_parallel, a.lat1 = a.latitude_of_standard_parallel), a.latitude_of_1st_standard_parallel !== void 0 && (a.lat1 = a.latitude_of_1st_standard_parallel), a.latitude_of_2nd_standard_parallel !== void 0 && (a.lat2 = a.latitude_of_2nd_standard_parallel), a.latitude_of_projection_centre !== void 0 && (a.lat0 = a.latitude_of_projection_centre), a.longitude_of_projection_centre !== void 0 && (a.longc = a.longitude_of_projection_centre), a.easting_at_false_origin !== void 0 && (a.x0 = a.easting_at_false_origin), a.northing_at_false_origin !== void 0 && (a.y0 = a.northing_at_false_origin), a.latitude_of_natural_origin !== void 0 && (a.lat0 = a.latitude_of_natural_origin), a.longitude_of_natural_origin !== void 0 && (a.long0 = a.longitude_of_natural_origin), a.longitude_of_origin !== void 0 && (a.long0 = a.longitude_of_origin), a.false_easting !== void 0 && (a.x0 = a.false_easting), a.easting_at_projection_centre && (a.x0 = a.easting_at_projection_centre), a.false_northing !== void 0 && (a.y0 = a.false_northing), a.northing_at_projection_centre && (a.y0 = a.northing_at_projection_centre), a.standard_parallel_1 !== void 0 && (a.lat1 = a.standard_parallel_1), a.standard_parallel_2 !== void 0 && (a.lat2 = a.standard_parallel_2), a.scale_factor_at_natural_origin !== void 0 && (a.k0 = a.scale_factor_at_natural_origin), a.scale_factor_at_projection_centre !== void 0 && (a.k0 = a.scale_factor_at_projection_centre), a.scale_factor_on_pseudo_standard_parallel !== void 0 && (a.k0 = a.scale_factor_on_pseudo_standard_parallel), a.azimuth !== void 0 && (a.alpha = a.azimuth), a.azimuth_at_projection_centre !== void 0 && (a.alpha = a.azimuth_at_projection_centre), a.angle_from_rectified_to_skew_grid && (a.rectified_grid_angle = a.angle_from_rectified_to_skew_grid), bs(a), a);
}
var W1 = [
  "PROJECTEDCRS",
  "PROJCRS",
  "GEOGCS",
  "GEOCCS",
  "PROJCS",
  "LOCAL_CS",
  "GEODCRS",
  "GEODETICCRS",
  "GEODETICDATUM",
  "ENGCRS",
  "ENGINEERINGCRS"
];
function J1(e, a) {
  var t = a[0], s = a[1];
  !(t in e) && s in e && (e[t] = e[s], a.length === 3 && (e[t] = a[2](e[t])));
}
function ws(e) {
  for (var a = Object.keys(e), t = 0, s = a.length; t < s; ++t) {
    var n = a[t];
    W1.indexOf(n) !== -1 && Q1(e[n]), typeof e[n] == "object" && ws(e[n]);
  }
}
function Q1(e) {
  if (e.AUTHORITY) {
    var a = Object.keys(e.AUTHORITY)[0];
    a && a in e.AUTHORITY && (e.title = a + ":" + e.AUTHORITY[a]);
  }
  if (e.type === "GEOGCS" ? e.projName = "longlat" : e.type === "LOCAL_CS" ? (e.projName = "identity", e.local = !0) : typeof e.PROJECTION == "object" ? e.projName = Object.keys(e.PROJECTION)[0] : e.projName = e.PROJECTION, e.AXIS) {
    for (var t = "", s = 0, n = e.AXIS.length; s < n; ++s) {
      var i = [e.AXIS[s][0].toLowerCase(), e.AXIS[s][1].toLowerCase()];
      i[0].indexOf("north") !== -1 || (i[0] === "y" || i[0] === "lat") && i[1] === "north" ? t += "n" : i[0].indexOf("south") !== -1 || (i[0] === "y" || i[0] === "lat") && i[1] === "south" ? t += "s" : i[0].indexOf("east") !== -1 || (i[0] === "x" || i[0] === "lon") && i[1] === "east" ? t += "e" : (i[0].indexOf("west") !== -1 || (i[0] === "x" || i[0] === "lon") && i[1] === "west") && (t += "w");
    }
    t.length === 2 && (t += "u"), t.length === 3 && (e.axis = t);
  }
  e.UNIT && (e.units = e.UNIT.name.toLowerCase(), e.units === "metre" && (e.units = "meter"), e.UNIT.convert && (e.type === "GEOGCS" ? e.DATUM && e.DATUM.SPHEROID && (e.to_meter = e.UNIT.convert * e.DATUM.SPHEROID.a) : e.to_meter = e.UNIT.convert));
  var d = e.GEOGCS;
  e.type === "GEOGCS" && (d = e), d && (d.PRIMEM && d.PRIMEM.convert && (e.from_greenwich = W(d.PRIMEM.convert)), d.DATUM ? e.datumCode = d.DATUM.name.toLowerCase() : e.datumCode = d.name.toLowerCase(), e.datumCode.slice(0, 2) === "d_" && (e.datumCode = e.datumCode.slice(2)), e.datumCode === "new_zealand_1949" && (e.datumCode = "nzgd49"), (e.datumCode === "wgs_1984" || e.datumCode === "world_geodetic_system_1984") && (e.PROJECTION === "Mercator_Auxiliary_Sphere" && (e.sphere = !0), e.datumCode = "wgs84"), e.datumCode === "belge_1972" && (e.datumCode = "rnb72"), d.DATUM && d.DATUM.SPHEROID && (e.ellps = d.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), e.ellps.toLowerCase().slice(0, 13) === "international" && (e.ellps = "intl"), e.a = d.DATUM.SPHEROID.a, e.rf = parseFloat(d.DATUM.SPHEROID.rf)), d.DATUM && d.DATUM.TOWGS84 && (e.datum_params = d.DATUM.TOWGS84), ~e.datumCode.indexOf("osgb_1936") && (e.datumCode = "osgb36"), ~e.datumCode.indexOf("osni_1952") && (e.datumCode = "osni52"), (~e.datumCode.indexOf("tm65") || ~e.datumCode.indexOf("geodetic_datum_of_1965")) && (e.datumCode = "ire65"), e.datumCode === "ch1903+" && (e.datumCode = "ch1903"), ~e.datumCode.indexOf("israel") && (e.datumCode = "isr93")), e.b && !isFinite(e.b) && (e.b = e.a), e.rectified_grid_angle && (e.rectified_grid_angle = W(e.rectified_grid_angle));
  function o(l) {
    var f = e.to_meter || 1;
    return l * f;
  }
  var c = function(l) {
    return J1(e, l);
  }, r = [
    ["standard_parallel_1", "Standard_Parallel_1"],
    ["standard_parallel_1", "Latitude of 1st standard parallel"],
    ["standard_parallel_2", "Standard_Parallel_2"],
    ["standard_parallel_2", "Latitude of 2nd standard parallel"],
    ["false_easting", "False_Easting"],
    ["false_easting", "False easting"],
    ["false-easting", "Easting at false origin"],
    ["false_northing", "False_Northing"],
    ["false_northing", "False northing"],
    ["false_northing", "Northing at false origin"],
    ["central_meridian", "Central_Meridian"],
    ["central_meridian", "Longitude of natural origin"],
    ["central_meridian", "Longitude of false origin"],
    ["latitude_of_origin", "Latitude_Of_Origin"],
    ["latitude_of_origin", "Central_Parallel"],
    ["latitude_of_origin", "Latitude of natural origin"],
    ["latitude_of_origin", "Latitude of false origin"],
    ["scale_factor", "Scale_Factor"],
    ["k0", "scale_factor"],
    ["latitude_of_center", "Latitude_Of_Center"],
    ["latitude_of_center", "Latitude_of_center"],
    ["lat0", "latitude_of_center", W],
    ["longitude_of_center", "Longitude_Of_Center"],
    ["longitude_of_center", "Longitude_of_center"],
    ["longc", "longitude_of_center", W],
    ["x0", "false_easting", o],
    ["y0", "false_northing", o],
    ["long0", "central_meridian", W],
    ["lat0", "latitude_of_origin", W],
    ["lat0", "standard_parallel_1", W],
    ["lat1", "standard_parallel_1", W],
    ["lat2", "standard_parallel_2", W],
    ["azimuth", "Azimuth"],
    ["alpha", "azimuth", W],
    ["srsCode", "name"]
  ];
  r.forEach(c), bs(e);
}
function ga(e) {
  if (typeof e == "object")
    return va(e);
  const a = V1(e);
  var t = X1(e);
  if (a === "WKT2") {
    const i = q1(t);
    return va(i);
  }
  var s = t[0], n = {};
  return ve(t, n), ws(n), n[s];
}
function j(e) {
  var a = this;
  if (arguments.length === 2) {
    var t = arguments[1];
    typeof t == "string" ? t.charAt(0) === "+" ? j[
      /** @type {string} */
      e
    ] = Va(arguments[1]) : j[
      /** @type {string} */
      e
    ] = ga(arguments[1]) : t && typeof t == "object" && !("projName" in t) ? j[
      /** @type {string} */
      e
    ] = ga(arguments[1]) : (j[
      /** @type {string} */
      e
    ] = t, t || delete j[
      /** @type {string} */
      e
    ]);
  } else if (arguments.length === 1) {
    if (Array.isArray(e))
      return e.map(function(s) {
        return Array.isArray(s) ? j.apply(a, s) : j(s);
      });
    if (typeof e == "string") {
      if (e in j)
        return j[e];
    } else "EPSG" in e ? j["EPSG:" + e.EPSG] = e : "ESRI" in e ? j["ESRI:" + e.ESRI] = e : "IAU2000" in e ? j["IAU2000:" + e.IAU2000] = e : console.log(e);
    return;
  }
}
U1(j);
function Z1(e) {
  return typeof e == "string";
}
function e2(e) {
  return e in j;
}
function a2(e) {
  return e.indexOf("+") !== 0 && e.indexOf("[") !== -1 || typeof e == "object" && !("srsCode" in e);
}
var Gt = ["3857", "900913", "3785", "102113"];
function t2(e) {
  if (e.title)
    return e.title.toLowerCase().indexOf("epsg:") === 0 && Gt.indexOf(e.title.substr(5)) > -1;
  var a = re(e, "authority");
  if (a) {
    var t = re(a, "epsg");
    return t && Gt.indexOf(t) > -1;
  }
}
function s2(e) {
  var a = re(e, "extension");
  if (a)
    return re(a, "proj4");
}
function n2(e) {
  return e[0] === "+";
}
function i2(e) {
  let a;
  if (Z1(e))
    if (e2(e))
      a = j[e];
    else if (a2(e)) {
      a = ga(e);
      var t = s2(a);
      t && (a = Va(t));
    } else n2(e) && (a = Va(e));
  else "projName" in e ? a = e : a = ga(e);
  return a && t2(a) ? j["EPSG:3857"] : a;
}
function xt(e, a) {
  e = e || {};
  var t, s;
  if (!a)
    return e;
  for (s in a)
    t = a[s], t !== void 0 && (e[s] = t);
  return e;
}
function ie(e, a, t) {
  var s = e * a;
  return t / Math.sqrt(1 - s * s);
}
function aa(e) {
  return e < 0 ? -1 : 1;
}
function M(e, a) {
  return a || Math.abs(e) <= I ? e : e - aa(e) * We;
}
function ae(e, a, t) {
  var s = e * t, n = 0.5 * e;
  return s = Math.pow((1 - s) / (1 + s), n), Math.tan(0.5 * (_ - a)) / s;
}
function Qe(e, a) {
  for (var t = 0.5 * e, s, n, i = _ - 2 * Math.atan(a), d = 0; d <= 15; d++)
    if (s = e * Math.sin(i), n = _ - 2 * Math.atan(a * Math.pow((1 - s) / (1 + s), t)) - i, i += n, Math.abs(n) <= 1e-10)
      return i;
  return -9999;
}
function o2() {
  var e = this.b / this.a;
  this.es = 1 - e * e, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = ie(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1);
}
function d2(e) {
  var a = e.x, t = e.y;
  if (t * $ > 90 && t * $ < -90 && a * $ > 180 && a * $ < -180)
    return null;
  var s, n;
  if (Math.abs(Math.abs(t) - _) <= y)
    return null;
  if (this.sphere)
    s = this.x0 + this.a * this.k0 * M(a - this.long0, this.over), n = this.y0 + this.a * this.k0 * Math.log(Math.tan(P + 0.5 * t));
  else {
    var i = Math.sin(t), d = ae(this.e, t, i);
    s = this.x0 + this.a * this.k0 * M(a - this.long0, this.over), n = this.y0 - this.a * this.k0 * Math.log(d);
  }
  return e.x = s, e.y = n, e;
}
function c2(e) {
  var a = e.x - this.x0, t = e.y - this.y0, s, n;
  if (this.sphere)
    n = _ - 2 * Math.atan(Math.exp(-t / (this.a * this.k0)));
  else {
    var i = Math.exp(-t / (this.a * this.k0));
    if (n = Qe(this.e, i), n === -9999)
      return null;
  }
  return s = M(this.long0 + a / (this.a * this.k0), this.over), e.x = s, e.y = n, e;
}
var r2 = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "Mercator_Variant_A", "merc"], h2 = {
  init: o2,
  forward: d2,
  inverse: c2,
  names: r2
};
function f2() {
}
function Ut(e) {
  return e;
}
var zs = ["longlat", "identity"], l2 = {
  init: f2,
  forward: Ut,
  inverse: Ut,
  names: zs
}, m2 = [h2, l2], le = {}, ge = [];
function ps(e, a) {
  var t = ge.length;
  return e.names ? (ge[t] = e, e.names.forEach(function(s) {
    le[s.toLowerCase()] = t;
  }), this) : (console.log(a), !0);
}
function _s(e) {
  return e.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
}
function u2(e) {
  if (!e)
    return !1;
  var a = e.toLowerCase();
  if (typeof le[a] < "u" && ge[le[a]] || (a = _s(a), a in le && ge[le[a]]))
    return ge[le[a]];
}
function b2() {
  m2.forEach(ps);
}
var w2 = {
  start: b2,
  add: ps,
  get: u2
}, vs = {
  MERIT: {
    a: 6378137,
    rf: 298.257,
    ellipseName: "MERIT 1983"
  },
  SGS85: {
    a: 6378136,
    rf: 298.257,
    ellipseName: "Soviet Geodetic System 85"
  },
  GRS80: {
    a: 6378137,
    rf: 298.257222101,
    ellipseName: "GRS 1980(IUGG, 1980)"
  },
  IAU76: {
    a: 6378140,
    rf: 298.257,
    ellipseName: "IAU 1976"
  },
  airy: {
    a: 6377563396e-3,
    b: 635625691e-2,
    ellipseName: "Airy 1830"
  },
  APL4: {
    a: 6378137,
    rf: 298.25,
    ellipseName: "Appl. Physics. 1965"
  },
  NWL9D: {
    a: 6378145,
    rf: 298.25,
    ellipseName: "Naval Weapons Lab., 1965"
  },
  mod_airy: {
    a: 6377340189e-3,
    b: 6356034446e-3,
    ellipseName: "Modified Airy"
  },
  andrae: {
    a: 637710443e-2,
    rf: 300,
    ellipseName: "Andrae 1876 (Den., Iclnd.)"
  },
  aust_SA: {
    a: 6378160,
    rf: 298.25,
    ellipseName: "Australian Natl & S. Amer. 1969"
  },
  GRS67: {
    a: 6378160,
    rf: 298.247167427,
    ellipseName: "GRS 67(IUGG 1967)"
  },
  bessel: {
    a: 6377397155e-3,
    rf: 299.1528128,
    ellipseName: "Bessel 1841"
  },
  bess_nam: {
    a: 6377483865e-3,
    rf: 299.1528128,
    ellipseName: "Bessel 1841 (Namibia)"
  },
  clrk66: {
    a: 63782064e-1,
    b: 63565838e-1,
    ellipseName: "Clarke 1866"
  },
  clrk80: {
    a: 6378249145e-3,
    rf: 293.4663,
    ellipseName: "Clarke 1880 mod."
  },
  clrk80ign: {
    a: 63782492e-1,
    b: 6356515,
    rf: 293.4660213,
    ellipseName: "Clarke 1880 (IGN)"
  },
  clrk58: {
    a: 6378293645208759e-9,
    rf: 294.2606763692654,
    ellipseName: "Clarke 1858"
  },
  CPM: {
    a: 63757387e-1,
    rf: 334.29,
    ellipseName: "Comm. des Poids et Mesures 1799"
  },
  delmbr: {
    a: 6376428,
    rf: 311.5,
    ellipseName: "Delambre 1810 (Belgium)"
  },
  engelis: {
    a: 637813605e-2,
    rf: 298.2566,
    ellipseName: "Engelis 1985"
  },
  evrst30: {
    a: 6377276345e-3,
    rf: 300.8017,
    ellipseName: "Everest 1830"
  },
  evrst48: {
    a: 6377304063e-3,
    rf: 300.8017,
    ellipseName: "Everest 1948"
  },
  evrst56: {
    a: 6377301243e-3,
    rf: 300.8017,
    ellipseName: "Everest 1956"
  },
  evrst69: {
    a: 6377295664e-3,
    rf: 300.8017,
    ellipseName: "Everest 1969"
  },
  evrstSS: {
    a: 6377298556e-3,
    rf: 300.8017,
    ellipseName: "Everest (Sabah & Sarawak)"
  },
  fschr60: {
    a: 6378166,
    rf: 298.3,
    ellipseName: "Fischer (Mercury Datum) 1960"
  },
  fschr60m: {
    a: 6378155,
    rf: 298.3,
    ellipseName: "Fischer 1960"
  },
  fschr68: {
    a: 6378150,
    rf: 298.3,
    ellipseName: "Fischer 1968"
  },
  helmert: {
    a: 6378200,
    rf: 298.3,
    ellipseName: "Helmert 1906"
  },
  hough: {
    a: 6378270,
    rf: 297,
    ellipseName: "Hough"
  },
  intl: {
    a: 6378388,
    rf: 297,
    ellipseName: "International 1909 (Hayford)"
  },
  kaula: {
    a: 6378163,
    rf: 298.24,
    ellipseName: "Kaula 1961"
  },
  lerch: {
    a: 6378139,
    rf: 298.257,
    ellipseName: "Lerch 1979"
  },
  mprts: {
    a: 6397300,
    rf: 191,
    ellipseName: "Maupertius 1738"
  },
  new_intl: {
    a: 63781575e-1,
    b: 63567722e-1,
    ellipseName: "New International 1967"
  },
  plessis: {
    a: 6376523,
    rf: 6355863,
    ellipseName: "Plessis 1817 (France)"
  },
  krass: {
    a: 6378245,
    rf: 298.3,
    ellipseName: "Krassovsky, 1942"
  },
  SEasia: {
    a: 6378155,
    b: 63567733205e-4,
    ellipseName: "Southeast Asia"
  },
  walbeck: {
    a: 6376896,
    b: 63558348467e-4,
    ellipseName: "Walbeck"
  },
  WGS60: {
    a: 6378165,
    rf: 298.3,
    ellipseName: "WGS 60"
  },
  WGS66: {
    a: 6378145,
    rf: 298.25,
    ellipseName: "WGS 66"
  },
  WGS7: {
    a: 6378135,
    rf: 298.26,
    ellipseName: "WGS 72"
  },
  WGS84: {
    a: 6378137,
    rf: 298.257223563,
    ellipseName: "WGS 84"
  },
  sphere: {
    a: 6370997,
    b: 6370997,
    ellipseName: "Normal Sphere (r=6370997)"
  }
};
const z2 = vs.WGS84;
function p2(e, a, t, s) {
  var n = e * e, i = a * a, d = (n - i) / n, o = 0;
  s ? (e *= 1 - d * (N1 + d * (j1 + d * R1)), n = e * e, d = 0) : o = Math.sqrt(d);
  var c = (n - i) / i;
  return {
    es: d,
    e: o,
    ep2: c
  };
}
function _2(e, a, t, s, n) {
  if (!e) {
    var i = re(vs, s);
    i || (i = z2), e = i.a, a = i.b, t = i.rf;
  }
  return t && !a && (a = (1 - 1 / t) * e), (t === 0 || Math.abs(e - a) < y) && (n = !0, a = e), {
    a: e,
    b: a,
    rf: t,
    sphere: n
  };
}
var ua = {
  wgs84: {
    towgs84: "0,0,0",
    ellipse: "WGS84",
    datumName: "WGS84"
  },
  ch1903: {
    towgs84: "674.374,15.056,405.346",
    ellipse: "bessel",
    datumName: "swiss"
  },
  ggrs87: {
    towgs84: "-199.87,74.79,246.62",
    ellipse: "GRS80",
    datumName: "Greek_Geodetic_Reference_System_1987"
  },
  nad83: {
    towgs84: "0,0,0",
    ellipse: "GRS80",
    datumName: "North_American_Datum_1983"
  },
  nad27: {
    nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
    ellipse: "clrk66",
    datumName: "North_American_Datum_1927"
  },
  potsdam: {
    towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
    ellipse: "bessel",
    datumName: "Potsdam Rauenberg 1950 DHDN"
  },
  carthage: {
    towgs84: "-263.0,6.0,431.0",
    ellipse: "clark80",
    datumName: "Carthage 1934 Tunisia"
  },
  hermannskogel: {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Hermannskogel"
  },
  mgi: {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Militar-Geographische Institut"
  },
  osni52: {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "airy",
    datumName: "Irish National"
  },
  ire65: {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "mod_airy",
    datumName: "Ireland 1965"
  },
  rassadiran: {
    towgs84: "-133.63,-157.5,-158.62",
    ellipse: "intl",
    datumName: "Rassadiran"
  },
  nzgd49: {
    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
    ellipse: "intl",
    datumName: "New Zealand Geodetic Datum 1949"
  },
  osgb36: {
    towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
    ellipse: "airy",
    datumName: "Ordnance Survey of Great Britain 1936"
  },
  s_jtsk: {
    towgs84: "589,76,480",
    ellipse: "bessel",
    datumName: "S-JTSK (Ferro)"
  },
  beduaram: {
    towgs84: "-106,-87,188",
    ellipse: "clrk80",
    datumName: "Beduaram"
  },
  gunung_segara: {
    towgs84: "-403,684,41",
    ellipse: "bessel",
    datumName: "Gunung Segara Jakarta"
  },
  rnb72: {
    towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
    ellipse: "intl",
    datumName: "Reseau National Belge 1972"
  },
  EPSG_5451: {
    towgs84: "6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649"
  },
  IGNF_LURESG: {
    towgs84: "-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43"
  },
  EPSG_4614: {
    towgs84: "-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065"
  },
  EPSG_4615: {
    towgs84: "-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748"
  },
  ESRI_37241: {
    towgs84: "-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031"
  },
  ESRI_37249: {
    towgs84: "-440.296,58.548,296.265,1.128,10.202,4.559,-0.438"
  },
  ESRI_37245: {
    towgs84: "-511.151,-181.269,139.609,1.05,2.703,1.798,3.071"
  },
  EPSG_4178: {
    towgs84: "24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01"
  },
  EPSG_4622: {
    towgs84: "-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984"
  },
  EPSG_4625: {
    towgs84: "126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227"
  },
  EPSG_5252: {
    towgs84: "0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439"
  },
  EPSG_4314: {
    towgs84: "597.1,71.4,412.1,0.894,0.068,-1.563,7.58"
  },
  EPSG_4282: {
    towgs84: "-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166"
  },
  EPSG_4231: {
    towgs84: "-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218"
  },
  EPSG_4274: {
    towgs84: "-230.994,102.591,25.199,0.633,-0.239,0.9,1.95"
  },
  EPSG_4134: {
    towgs84: "-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006"
  },
  EPSG_4254: {
    towgs84: "18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013"
  },
  EPSG_4159: {
    towgs84: "-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175"
  },
  EPSG_4687: {
    towgs84: "0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093"
  },
  EPSG_4227: {
    towgs84: "-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225"
  },
  EPSG_4746: {
    towgs84: "599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46"
  },
  EPSG_4745: {
    towgs84: "612.4,77,440.2,-0.054,0.057,-2.797,2.55"
  },
  EPSG_6311: {
    towgs84: "8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926"
  },
  EPSG_4289: {
    towgs84: "565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244"
  },
  EPSG_4230: {
    towgs84: "-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4"
  },
  EPSG_4154: {
    towgs84: "-123.02,-158.95,-168.47"
  },
  EPSG_4156: {
    towgs84: "570.8,85.7,462.8,4.998,1.587,5.261,3.56"
  },
  EPSG_4299: {
    towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
  },
  EPSG_4179: {
    towgs84: "33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84"
  },
  EPSG_4313: {
    towgs84: "-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747"
  },
  EPSG_4194: {
    towgs84: "163.511,127.533,-159.789"
  },
  EPSG_4195: {
    towgs84: "105,326,-102.5"
  },
  EPSG_4196: {
    towgs84: "-45,417,-3.5"
  },
  EPSG_4611: {
    towgs84: "-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246"
  },
  EPSG_4633: {
    towgs84: "137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824"
  },
  EPSG_4641: {
    towgs84: "-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993"
  },
  EPSG_4643: {
    towgs84: "-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002"
  },
  EPSG_4300: {
    towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
  },
  EPSG_4188: {
    towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
  },
  EPSG_4660: {
    towgs84: "982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805"
  },
  EPSG_4662: {
    towgs84: "97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259"
  },
  EPSG_3906: {
    towgs84: "577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664"
  },
  EPSG_4307: {
    towgs84: "-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547"
  },
  EPSG_6892: {
    towgs84: "-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686"
  },
  EPSG_4690: {
    towgs84: "221.597,152.441,176.523,2.403,1.3893,0.884,11.4648"
  },
  EPSG_4691: {
    towgs84: "218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817"
  },
  EPSG_4629: {
    towgs84: "72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653"
  },
  EPSG_4630: {
    towgs84: "165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111"
  },
  EPSG_4692: {
    towgs84: "217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093"
  },
  EPSG_9333: {
    towgs84: "0,0,0,-0.008393,0.000749,-0.010276,0"
  },
  EPSG_9059: {
    towgs84: "0,0,0"
  },
  EPSG_4312: {
    towgs84: "601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887"
  },
  EPSG_4123: {
    towgs84: "-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496"
  },
  EPSG_4309: {
    towgs84: "-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365"
  },
  ESRI_104106: {
    towgs84: "-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058"
  },
  EPSG_4281: {
    towgs84: "-219.247,-73.802,269.529"
  },
  EPSG_4322: {
    towgs84: "0,0,4.5"
  },
  EPSG_4324: {
    towgs84: "0,0,1.9"
  },
  EPSG_4284: {
    towgs84: "43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549"
  },
  EPSG_4277: {
    towgs84: "446.448,-125.157,542.06,0.15,0.247,0.842,-20.489"
  },
  EPSG_4207: {
    towgs84: "-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46"
  },
  EPSG_4688: {
    towgs84: "347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647"
  },
  EPSG_4689: {
    towgs84: "410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218"
  },
  EPSG_4720: {
    towgs84: "0,0,4.5"
  },
  EPSG_4273: {
    towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
  },
  EPSG_4240: {
    towgs84: "204.64,834.74,293.8"
  },
  EPSG_4817: {
    towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
  },
  ESRI_104131: {
    towgs84: "426.62,142.62,460.09,4.98,4.49,-12.42,-17.1"
  },
  EPSG_4265: {
    towgs84: "-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
  },
  EPSG_4263: {
    towgs84: "-111.92,-87.85,114.5,1.875,0.202,0.219,0.032"
  },
  EPSG_4298: {
    towgs84: "-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536"
  },
  EPSG_4270: {
    towgs84: "-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424"
  },
  EPSG_4229: {
    towgs84: "-121.8,98.1,-10.7"
  },
  EPSG_4220: {
    towgs84: "-55.5,-348,-229.2"
  },
  EPSG_4214: {
    towgs84: "12.646,-155.176,-80.863"
  },
  EPSG_4232: {
    towgs84: "-345,3,223"
  },
  EPSG_4238: {
    towgs84: "-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037"
  },
  EPSG_4168: {
    towgs84: "-170,33,326"
  },
  EPSG_4131: {
    towgs84: "199,931,318.9"
  },
  EPSG_4152: {
    towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
  },
  EPSG_5228: {
    towgs84: "572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378"
  },
  EPSG_8351: {
    towgs84: "485.021,169.465,483.839,7.786342,4.397554,4.102655,0"
  },
  EPSG_4683: {
    towgs84: "-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06"
  },
  EPSG_4133: {
    towgs84: "0,0,0"
  },
  EPSG_7373: {
    towgs84: "0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693"
  },
  EPSG_9075: {
    towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
  },
  EPSG_9072: {
    towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
  },
  EPSG_9294: {
    towgs84: "1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388"
  },
  EPSG_4212: {
    towgs84: "-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492"
  },
  EPSG_4191: {
    towgs84: "-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703"
  },
  EPSG_4237: {
    towgs84: "52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191"
  },
  EPSG_4740: {
    towgs84: "-1.08,-0.27,-0.9"
  },
  EPSG_4124: {
    towgs84: "419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496"
  },
  EPSG_5681: {
    towgs84: "584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922"
  },
  EPSG_4141: {
    towgs84: "23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262"
  },
  EPSG_4204: {
    towgs84: "-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194"
  },
  EPSG_4319: {
    towgs84: "226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798"
  },
  EPSG_4200: {
    towgs84: "24.82,-131.21,-82.66"
  },
  EPSG_4130: {
    towgs84: "0,0,0"
  },
  EPSG_4127: {
    towgs84: "-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359"
  },
  EPSG_4149: {
    towgs84: "674.374,15.056,405.346"
  },
  EPSG_4617: {
    towgs84: "-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0"
  },
  EPSG_4663: {
    towgs84: "-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485"
  },
  EPSG_4664: {
    towgs84: "-211.939,137.626,58.3,-0.089,0.251,0.079,0.384"
  },
  EPSG_4665: {
    towgs84: "-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048"
  },
  EPSG_4666: {
    towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
  },
  EPSG_4756: {
    towgs84: "-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188"
  },
  EPSG_4723: {
    towgs84: "-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925"
  },
  EPSG_4726: {
    towgs84: "8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081"
  },
  EPSG_4267: {
    towgs84: "-8.0,160.0,176.0"
  },
  EPSG_5365: {
    towgs84: "-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693"
  },
  EPSG_4218: {
    towgs84: "304.5,306.5,-318.1"
  },
  EPSG_4242: {
    towgs84: "-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95"
  },
  EPSG_4216: {
    towgs84: "-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289"
  },
  ESRI_104105: {
    towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
  },
  ESRI_104129: {
    towgs84: "0,0,0"
  },
  EPSG_4673: {
    towgs84: "174.05,-25.49,112.57"
  },
  EPSG_4202: {
    towgs84: "-124,-60,154"
  },
  EPSG_4203: {
    towgs84: "-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191"
  },
  EPSG_3819: {
    towgs84: "595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408"
  },
  EPSG_8694: {
    towgs84: "-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169"
  },
  EPSG_4145: {
    towgs84: "275.57,676.78,229.6"
  },
  EPSG_4283: {
    towgs84: "0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994"
  },
  EPSG_4317: {
    towgs84: "2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063"
  },
  EPSG_4272: {
    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993"
  },
  EPSG_4248: {
    towgs84: "-307.7,265.3,-363.5"
  },
  EPSG_5561: {
    towgs84: "24,-121,-76"
  },
  EPSG_5233: {
    towgs84: "-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338"
  },
  ESRI_104130: {
    towgs84: "-86,-98,-119"
  },
  ESRI_104102: {
    towgs84: "682,-203,480"
  },
  ESRI_37207: {
    towgs84: "7,-10,-26"
  },
  EPSG_4675: {
    towgs84: "59.935,118.4,-10.871"
  },
  ESRI_104109: {
    towgs84: "-89.121,-348.182,260.871"
  },
  ESRI_104112: {
    towgs84: "-185.583,-230.096,281.361"
  },
  ESRI_104113: {
    towgs84: "25.1,-275.6,222.6"
  },
  IGNF_WGS72G: {
    towgs84: "0,12,6"
  },
  IGNF_NTFG: {
    towgs84: "-168,-60,320"
  },
  IGNF_EFATE57G: {
    towgs84: "-127,-769,472"
  },
  IGNF_PGP50G: {
    towgs84: "324.8,153.6,172.1"
  },
  IGNF_REUN47G: {
    towgs84: "94,-948,-1262"
  },
  IGNF_CSG67G: {
    towgs84: "-186,230,110"
  },
  IGNF_GUAD48G: {
    towgs84: "-467,-16,-300"
  },
  IGNF_TAHI51G: {
    towgs84: "162,117,154"
  },
  IGNF_TAHAAG: {
    towgs84: "65,342,77"
  },
  IGNF_NUKU72G: {
    towgs84: "84,274,65"
  },
  IGNF_PETRELS72G: {
    towgs84: "365,194,166"
  },
  IGNF_WALL78G: {
    towgs84: "253,-133,-127"
  },
  IGNF_MAYO50G: {
    towgs84: "-382,-59,-262"
  },
  IGNF_TANNAG: {
    towgs84: "-139,-967,436"
  },
  IGNF_IGN72G: {
    towgs84: "-13,-348,292"
  },
  IGNF_ATIGG: {
    towgs84: "1118,23,66"
  },
  IGNF_FANGA84G: {
    towgs84: "150.57,158.33,118.32"
  },
  IGNF_RUSAT84G: {
    towgs84: "202.13,174.6,-15.74"
  },
  IGNF_KAUE70G: {
    towgs84: "126.74,300.1,-75.49"
  },
  IGNF_MOP90G: {
    towgs84: "-10.8,-1.8,12.77"
  },
  IGNF_MHPF67G: {
    towgs84: "338.08,212.58,-296.17"
  },
  IGNF_TAHI79G: {
    towgs84: "160.61,116.05,153.69"
  },
  IGNF_ANAA92G: {
    towgs84: "1.5,3.84,4.81"
  },
  IGNF_MARQUI72G: {
    towgs84: "330.91,-13.92,58.56"
  },
  IGNF_APAT86G: {
    towgs84: "143.6,197.82,74.05"
  },
  IGNF_TUBU69G: {
    towgs84: "237.17,171.61,-77.84"
  },
  IGNF_STPM50G: {
    towgs84: "11.363,424.148,373.13"
  },
  EPSG_4150: {
    towgs84: "674.374,15.056,405.346"
  },
  EPSG_4754: {
    towgs84: "-208.4058,-109.8777,-2.5764"
  },
  ESRI_104101: {
    towgs84: "372.87,149.23,585.29"
  },
  EPSG_4693: {
    towgs84: "0,-0.15,0.68"
  },
  EPSG_6207: {
    towgs84: "293.17,726.18,245.36"
  },
  EPSG_4153: {
    towgs84: "-133.63,-157.5,-158.62"
  },
  EPSG_4132: {
    towgs84: "-241.54,-163.64,396.06"
  },
  EPSG_4221: {
    towgs84: "-154.5,150.7,100.4"
  },
  EPSG_4266: {
    towgs84: "-80.7,-132.5,41.1"
  },
  EPSG_4193: {
    towgs84: "-70.9,-151.8,-41.4"
  },
  EPSG_5340: {
    towgs84: "-0.41,0.46,-0.35"
  },
  EPSG_4246: {
    towgs84: "-294.7,-200.1,525.5"
  },
  EPSG_4318: {
    towgs84: "-3.2,-5.7,2.8"
  },
  EPSG_4121: {
    towgs84: "-199.87,74.79,246.62"
  },
  EPSG_4223: {
    towgs84: "-260.1,5.5,432.2"
  },
  EPSG_4158: {
    towgs84: "-0.465,372.095,171.736"
  },
  EPSG_4285: {
    towgs84: "-128.16,-282.42,21.93"
  },
  EPSG_4613: {
    towgs84: "-404.78,685.68,45.47"
  },
  EPSG_4607: {
    towgs84: "195.671,332.517,274.607"
  },
  EPSG_4475: {
    towgs84: "-381.788,-57.501,-256.673"
  },
  EPSG_4208: {
    towgs84: "-157.84,308.54,-146.6"
  },
  EPSG_4743: {
    towgs84: "70.995,-335.916,262.898"
  },
  EPSG_4710: {
    towgs84: "-323.65,551.39,-491.22"
  },
  EPSG_7881: {
    towgs84: "-0.077,0.079,0.086"
  },
  EPSG_4682: {
    towgs84: "283.729,735.942,261.143"
  },
  EPSG_4739: {
    towgs84: "-156,-271,-189"
  },
  EPSG_4679: {
    towgs84: "-80.01,253.26,291.19"
  },
  EPSG_4750: {
    towgs84: "-56.263,16.136,-22.856"
  },
  EPSG_4644: {
    towgs84: "-10.18,-350.43,291.37"
  },
  EPSG_4695: {
    towgs84: "-103.746,-9.614,-255.95"
  },
  EPSG_4292: {
    towgs84: "-355,21,72"
  },
  EPSG_4302: {
    towgs84: "-61.702,284.488,472.052"
  },
  EPSG_4143: {
    towgs84: "-124.76,53,466.79"
  },
  EPSG_4606: {
    towgs84: "-153,153,307"
  },
  EPSG_4699: {
    towgs84: "-770.1,158.4,-498.2"
  },
  EPSG_4247: {
    towgs84: "-273.5,110.6,-357.9"
  },
  EPSG_4160: {
    towgs84: "8.88,184.86,106.69"
  },
  EPSG_4161: {
    towgs84: "-233.43,6.65,173.64"
  },
  EPSG_9251: {
    towgs84: "-9.5,122.9,138.2"
  },
  EPSG_9253: {
    towgs84: "-78.1,101.6,133.3"
  },
  EPSG_4297: {
    towgs84: "-198.383,-240.517,-107.909"
  },
  EPSG_4269: {
    towgs84: "0,0,0"
  },
  EPSG_4301: {
    towgs84: "-147,506,687"
  },
  EPSG_4618: {
    towgs84: "-59,-11,-52"
  },
  EPSG_4612: {
    towgs84: "0,0,0"
  },
  EPSG_4678: {
    towgs84: "44.585,-131.212,-39.544"
  },
  EPSG_4250: {
    towgs84: "-130,29,364"
  },
  EPSG_4144: {
    towgs84: "214,804,268"
  },
  EPSG_4147: {
    towgs84: "-17.51,-108.32,-62.39"
  },
  EPSG_4259: {
    towgs84: "-254.1,-5.36,-100.29"
  },
  EPSG_4164: {
    towgs84: "-76,-138,67"
  },
  EPSG_4211: {
    towgs84: "-378.873,676.002,-46.255"
  },
  EPSG_4182: {
    towgs84: "-422.651,-172.995,84.02"
  },
  EPSG_4224: {
    towgs84: "-143.87,243.37,-33.52"
  },
  EPSG_4225: {
    towgs84: "-205.57,168.77,-4.12"
  },
  EPSG_5527: {
    towgs84: "-67.35,3.88,-38.22"
  },
  EPSG_4752: {
    towgs84: "98,390,-22"
  },
  EPSG_4310: {
    towgs84: "-30,190,89"
  },
  EPSG_9248: {
    towgs84: "-192.26,65.72,132.08"
  },
  EPSG_4680: {
    towgs84: "124.5,-63.5,-281"
  },
  EPSG_4701: {
    towgs84: "-79.9,-158,-168.9"
  },
  EPSG_4706: {
    towgs84: "-146.21,112.63,4.05"
  },
  EPSG_4805: {
    towgs84: "682,-203,480"
  },
  EPSG_4201: {
    towgs84: "-165,-11,206"
  },
  EPSG_4210: {
    towgs84: "-157,-2,-299"
  },
  EPSG_4183: {
    towgs84: "-104,167,-38"
  },
  EPSG_4139: {
    towgs84: "11,72,-101"
  },
  EPSG_4668: {
    towgs84: "-86,-98,-119"
  },
  EPSG_4717: {
    towgs84: "-2,151,181"
  },
  EPSG_4732: {
    towgs84: "102,52,-38"
  },
  EPSG_4280: {
    towgs84: "-377,681,-50"
  },
  EPSG_4209: {
    towgs84: "-138,-105,-289"
  },
  EPSG_4261: {
    towgs84: "31,146,47"
  },
  EPSG_4658: {
    towgs84: "-73,46,-86"
  },
  EPSG_4721: {
    towgs84: "265.025,384.929,-194.046"
  },
  EPSG_4222: {
    towgs84: "-136,-108,-292"
  },
  EPSG_4601: {
    towgs84: "-255,-15,71"
  },
  EPSG_4602: {
    towgs84: "725,685,536"
  },
  EPSG_4603: {
    towgs84: "72,213.7,93"
  },
  EPSG_4605: {
    towgs84: "9,183,236"
  },
  EPSG_4621: {
    towgs84: "137,248,-430"
  },
  EPSG_4657: {
    towgs84: "-28,199,5"
  },
  EPSG_4316: {
    towgs84: "103.25,-100.4,-307.19"
  },
  EPSG_4642: {
    towgs84: "-13,-348,292"
  },
  EPSG_4698: {
    towgs84: "145,-187,103"
  },
  EPSG_4192: {
    towgs84: "-206.1,-174.7,-87.7"
  },
  EPSG_4311: {
    towgs84: "-265,120,-358"
  },
  EPSG_4135: {
    towgs84: "58,-283,-182"
  },
  ESRI_104138: {
    towgs84: "198,-226,-347"
  },
  EPSG_4245: {
    towgs84: "-11,851,5"
  },
  EPSG_4142: {
    towgs84: "-125,53,467"
  },
  EPSG_4213: {
    towgs84: "-106,-87,188"
  },
  EPSG_4253: {
    towgs84: "-133,-77,-51"
  },
  EPSG_4129: {
    towgs84: "-132,-110,-335"
  },
  EPSG_4713: {
    towgs84: "-77,-128,142"
  },
  EPSG_4239: {
    towgs84: "217,823,299"
  },
  EPSG_4146: {
    towgs84: "295,736,257"
  },
  EPSG_4155: {
    towgs84: "-83,37,124"
  },
  EPSG_4165: {
    towgs84: "-173,253,27"
  },
  EPSG_4672: {
    towgs84: "175,-38,113"
  },
  EPSG_4236: {
    towgs84: "-637,-549,-203"
  },
  EPSG_4251: {
    towgs84: "-90,40,88"
  },
  EPSG_4271: {
    towgs84: "-2,374,172"
  },
  EPSG_4175: {
    towgs84: "-88,4,101"
  },
  EPSG_4716: {
    towgs84: "298,-304,-375"
  },
  EPSG_4315: {
    towgs84: "-23,259,-9"
  },
  EPSG_4744: {
    towgs84: "-242.2,-144.9,370.3"
  },
  EPSG_4244: {
    towgs84: "-97,787,86"
  },
  EPSG_4293: {
    towgs84: "616,97,-251"
  },
  EPSG_4714: {
    towgs84: "-127,-769,472"
  },
  EPSG_4736: {
    towgs84: "260,12,-147"
  },
  EPSG_6883: {
    towgs84: "-235,-110,393"
  },
  EPSG_6894: {
    towgs84: "-63,176,185"
  },
  EPSG_4205: {
    towgs84: "-43,-163,45"
  },
  EPSG_4256: {
    towgs84: "41,-220,-134"
  },
  EPSG_4262: {
    towgs84: "639,405,60"
  },
  EPSG_4604: {
    towgs84: "174,359,365"
  },
  EPSG_4169: {
    towgs84: "-115,118,426"
  },
  EPSG_4620: {
    towgs84: "-106,-129,165"
  },
  EPSG_4184: {
    towgs84: "-203,141,53"
  },
  EPSG_4616: {
    towgs84: "-289,-124,60"
  },
  EPSG_9403: {
    towgs84: "-307,-92,127"
  },
  EPSG_4684: {
    towgs84: "-133,-321,50"
  },
  EPSG_4708: {
    towgs84: "-491,-22,435"
  },
  EPSG_4707: {
    towgs84: "114,-116,-333"
  },
  EPSG_4709: {
    towgs84: "145,75,-272"
  },
  EPSG_4712: {
    towgs84: "-205,107,53"
  },
  EPSG_4711: {
    towgs84: "124,-234,-25"
  },
  EPSG_4718: {
    towgs84: "230,-199,-752"
  },
  EPSG_4719: {
    towgs84: "211,147,111"
  },
  EPSG_4724: {
    towgs84: "208,-435,-229"
  },
  EPSG_4725: {
    towgs84: "189,-79,-202"
  },
  EPSG_4735: {
    towgs84: "647,1777,-1124"
  },
  EPSG_4722: {
    towgs84: "-794,119,-298"
  },
  EPSG_4728: {
    towgs84: "-307,-92,127"
  },
  EPSG_4734: {
    towgs84: "-632,438,-609"
  },
  EPSG_4727: {
    towgs84: "912,-58,1227"
  },
  EPSG_4729: {
    towgs84: "185,165,42"
  },
  EPSG_4730: {
    towgs84: "170,42,84"
  },
  EPSG_4733: {
    towgs84: "276,-57,149"
  },
  ESRI_37218: {
    towgs84: "230,-199,-752"
  },
  ESRI_37240: {
    towgs84: "-7,215,225"
  },
  ESRI_37221: {
    towgs84: "252,-209,-751"
  },
  ESRI_4305: {
    towgs84: "-123,-206,219"
  },
  ESRI_104139: {
    towgs84: "-73,-247,227"
  },
  EPSG_4748: {
    towgs84: "51,391,-36"
  },
  EPSG_4219: {
    towgs84: "-384,664,-48"
  },
  EPSG_4255: {
    towgs84: "-333,-222,114"
  },
  EPSG_4257: {
    towgs84: "-587.8,519.75,145.76"
  },
  EPSG_4646: {
    towgs84: "-963,510,-359"
  },
  EPSG_6881: {
    towgs84: "-24,-203,268"
  },
  EPSG_6882: {
    towgs84: "-183,-15,273"
  },
  EPSG_4715: {
    towgs84: "-104,-129,239"
  },
  IGNF_RGF93GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGM04GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGSPM06GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGTAAF07GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGFG95GDD: {
    towgs84: "0,0,0"
  },
  IGNF_RGNCG: {
    towgs84: "0,0,0"
  },
  IGNF_RGPFGDD: {
    towgs84: "0,0,0"
  },
  IGNF_ETRS89G: {
    towgs84: "0,0,0"
  },
  IGNF_RGR92GDD: {
    towgs84: "0,0,0"
  },
  EPSG_4173: {
    towgs84: "0,0,0"
  },
  EPSG_4180: {
    towgs84: "0,0,0"
  },
  EPSG_4619: {
    towgs84: "0,0,0"
  },
  EPSG_4667: {
    towgs84: "0,0,0"
  },
  EPSG_4075: {
    towgs84: "0,0,0"
  },
  EPSG_6706: {
    towgs84: "0,0,0"
  },
  EPSG_7798: {
    towgs84: "0,0,0"
  },
  EPSG_4661: {
    towgs84: "0,0,0"
  },
  EPSG_4669: {
    towgs84: "0,0,0"
  },
  EPSG_8685: {
    towgs84: "0,0,0"
  },
  EPSG_4151: {
    towgs84: "0,0,0"
  },
  EPSG_9702: {
    towgs84: "0,0,0"
  },
  EPSG_4758: {
    towgs84: "0,0,0"
  },
  EPSG_4761: {
    towgs84: "0,0,0"
  },
  EPSG_4765: {
    towgs84: "0,0,0"
  },
  EPSG_8997: {
    towgs84: "0,0,0"
  },
  EPSG_4023: {
    towgs84: "0,0,0"
  },
  EPSG_4670: {
    towgs84: "0,0,0"
  },
  EPSG_4694: {
    towgs84: "0,0,0"
  },
  EPSG_4148: {
    towgs84: "0,0,0"
  },
  EPSG_4163: {
    towgs84: "0,0,0"
  },
  EPSG_4167: {
    towgs84: "0,0,0"
  },
  EPSG_4189: {
    towgs84: "0,0,0"
  },
  EPSG_4190: {
    towgs84: "0,0,0"
  },
  EPSG_4176: {
    towgs84: "0,0,0"
  },
  EPSG_4659: {
    towgs84: "0,0,0"
  },
  EPSG_3824: {
    towgs84: "0,0,0"
  },
  EPSG_3889: {
    towgs84: "0,0,0"
  },
  EPSG_4046: {
    towgs84: "0,0,0"
  },
  EPSG_4081: {
    towgs84: "0,0,0"
  },
  EPSG_4558: {
    towgs84: "0,0,0"
  },
  EPSG_4483: {
    towgs84: "0,0,0"
  },
  EPSG_5013: {
    towgs84: "0,0,0"
  },
  EPSG_5264: {
    towgs84: "0,0,0"
  },
  EPSG_5324: {
    towgs84: "0,0,0"
  },
  EPSG_5354: {
    towgs84: "0,0,0"
  },
  EPSG_5371: {
    towgs84: "0,0,0"
  },
  EPSG_5373: {
    towgs84: "0,0,0"
  },
  EPSG_5381: {
    towgs84: "0,0,0"
  },
  EPSG_5393: {
    towgs84: "0,0,0"
  },
  EPSG_5489: {
    towgs84: "0,0,0"
  },
  EPSG_5593: {
    towgs84: "0,0,0"
  },
  EPSG_6135: {
    towgs84: "0,0,0"
  },
  EPSG_6365: {
    towgs84: "0,0,0"
  },
  EPSG_5246: {
    towgs84: "0,0,0"
  },
  EPSG_7886: {
    towgs84: "0,0,0"
  },
  EPSG_8431: {
    towgs84: "0,0,0"
  },
  EPSG_8427: {
    towgs84: "0,0,0"
  },
  EPSG_8699: {
    towgs84: "0,0,0"
  },
  EPSG_8818: {
    towgs84: "0,0,0"
  },
  EPSG_4757: {
    towgs84: "0,0,0"
  },
  EPSG_9140: {
    towgs84: "0,0,0"
  },
  EPSG_8086: {
    towgs84: "0,0,0"
  },
  EPSG_4686: {
    towgs84: "0,0,0"
  },
  EPSG_4737: {
    towgs84: "0,0,0"
  },
  EPSG_4702: {
    towgs84: "0,0,0"
  },
  EPSG_4747: {
    towgs84: "0,0,0"
  },
  EPSG_4749: {
    towgs84: "0,0,0"
  },
  EPSG_4674: {
    towgs84: "0,0,0"
  },
  EPSG_4755: {
    towgs84: "0,0,0"
  },
  EPSG_4759: {
    towgs84: "0,0,0"
  },
  EPSG_4762: {
    towgs84: "0,0,0"
  },
  EPSG_4763: {
    towgs84: "0,0,0"
  },
  EPSG_4764: {
    towgs84: "0,0,0"
  },
  EPSG_4166: {
    towgs84: "0,0,0"
  },
  EPSG_4170: {
    towgs84: "0,0,0"
  },
  EPSG_5546: {
    towgs84: "0,0,0"
  },
  EPSG_7844: {
    towgs84: "0,0,0"
  },
  EPSG_4818: {
    towgs84: "589,76,480"
  },
  EPSG_10328: {
    towgs84: "0,0,0"
  },
  EPSG_9782: {
    towgs84: "0,0,0"
  },
  EPSG_9777: {
    towgs84: "0,0,0"
  },
  EPSG_10690: {
    towgs84: "0,0,0"
  },
  EPSG_10639: {
    towgs84: "0,0,0"
  },
  EPSG_10739: {
    towgs84: "0,0,0"
  },
  EPSG_7686: {
    towgs84: "0,0,0"
  },
  EPSG_8900: {
    towgs84: "0,0,0"
  },
  EPSG_5886: {
    towgs84: "0,0,0"
  },
  EPSG_7683: {
    towgs84: "0,0,0"
  },
  EPSG_6668: {
    towgs84: "0,0,0"
  },
  EPSG_20046: {
    towgs84: "0,0,0"
  },
  EPSG_10299: {
    towgs84: "0,0,0"
  },
  EPSG_10310: {
    towgs84: "0,0,0"
  },
  EPSG_10475: {
    towgs84: "0,0,0"
  },
  EPSG_4742: {
    towgs84: "0,0,0"
  },
  EPSG_10671: {
    towgs84: "0,0,0"
  },
  EPSG_10762: {
    towgs84: "0,0,0"
  },
  EPSG_10725: {
    towgs84: "0,0,0"
  },
  EPSG_10791: {
    towgs84: "0,0,0"
  },
  EPSG_10800: {
    towgs84: "0,0,0"
  },
  EPSG_10305: {
    towgs84: "0,0,0"
  },
  EPSG_10941: {
    towgs84: "0,0,0"
  },
  EPSG_10968: {
    towgs84: "0,0,0"
  },
  EPSG_10875: {
    towgs84: "0,0,0"
  },
  EPSG_6318: {
    towgs84: "0,0,0"
  },
  EPSG_10910: {
    towgs84: "0,0,0"
  }
};
for (var v2 in ua) {
  var Ra = ua[v2];
  Ra.datumName && (ua[Ra.datumName] = Ra);
}
function g2(e, a, t, s, n, i, d) {
  var o = {};
  return e === void 0 || e === "none" ? o.datum_type = qa : o.datum_type = I1, a && (o.datum_params = a.map(parseFloat), (o.datum_params[0] !== 0 || o.datum_params[1] !== 0 || o.datum_params[2] !== 0) && (o.datum_type = ue), o.datum_params.length > 3 && (o.datum_params[3] !== 0 || o.datum_params[4] !== 0 || o.datum_params[5] !== 0 || o.datum_params[6] !== 0) && (o.datum_type = be, o.datum_params[3] *= Fe, o.datum_params[4] *= Fe, o.datum_params[5] *= Fe, o.datum_params[6] = o.datum_params[6] / 1e6 + 1)), d && (o.datum_type = Be, o.grids = d), o.a = t, o.b = s, o.es = n, o.ep2 = i, o;
}
var rt = {};
function y2(e, a, t) {
  return a instanceof ArrayBuffer ? M2(e, a, t) : { ready: C2(e, a) };
}
function M2(e, a, t) {
  var s = !0;
  t !== void 0 && t.includeErrorFields === !1 && (s = !1);
  var n = new DataView(a), i = S2(n), d = E2(n, i), o = A2(n, d, i, s), c = { header: d, subgrids: o };
  return rt[e] = c, c;
}
async function C2(e, a) {
  for (var t = [], s = await a.getImageCount(), n = s - 1; n >= 0; n--) {
    var i = await a.getImage(n), d = await i.readRasters(), o = d, c = [i.getWidth(), i.getHeight()], r = i.getBoundingBox().map(It), l = [i.fileDirectory.ModelPixelScale[0], i.fileDirectory.ModelPixelScale[1]].map(It), f = r[0] + (c[0] - 1) * l[0], h = r[3] - (c[1] - 1) * l[1], u = o[0], m = o[1], b = [];
    for (let v = c[1] - 1; v >= 0; v--)
      for (let C = c[0] - 1; C >= 0; C--) {
        var w = v * c[0] + C;
        b.push([-de(m[w]), de(u[w])]);
      }
    t.push({
      del: l,
      lim: c,
      ll: [-f, h],
      cvs: b
    });
  }
  var p = {
    header: {
      nSubgrids: s
    },
    subgrids: t
  };
  return rt[e] = p, p;
}
function B2(e) {
  if (e === void 0)
    return null;
  var a = e.split(",");
  return a.map(k2);
}
function k2(e) {
  if (e.length === 0)
    return null;
  var a = e[0] === "@";
  return a && (e = e.slice(1)), e === "null" ? { name: "null", mandatory: !a, grid: null, isNull: !0 } : {
    name: e,
    mandatory: !a,
    grid: rt[e] || null,
    isNull: !1
  };
}
function It(e) {
  return e * Math.PI / 180;
}
function de(e) {
  return e / 3600 * Math.PI / 180;
}
function S2(e) {
  var a = e.getInt32(8, !1);
  return a === 11 ? !1 : (a = e.getInt32(8, !0), a !== 11 && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"), !0);
}
function E2(e, a) {
  return {
    nFields: e.getInt32(8, a),
    nSubgridFields: e.getInt32(24, a),
    nSubgrids: e.getInt32(40, a),
    shiftType: Ha(e, 56, 64).trim(),
    fromSemiMajorAxis: e.getFloat64(120, a),
    fromSemiMinorAxis: e.getFloat64(136, a),
    toSemiMajorAxis: e.getFloat64(152, a),
    toSemiMinorAxis: e.getFloat64(168, a)
  };
}
function Ha(e, a, t) {
  return String.fromCharCode.apply(null, new Uint8Array(e.buffer.slice(a, t)));
}
function A2(e, a, t, s) {
  for (var n = 176, i = [], d = 0; d < a.nSubgrids; d++) {
    var o = G2(e, n, t), c = x2(e, n, o, t, s), r = Math.round(
      1 + (o.upperLongitude - o.lowerLongitude) / o.longitudeInterval
    ), l = Math.round(
      1 + (o.upperLatitude - o.lowerLatitude) / o.latitudeInterval
    );
    i.push({
      ll: [de(o.lowerLongitude), de(o.lowerLatitude)],
      del: [de(o.longitudeInterval), de(o.latitudeInterval)],
      lim: [r, l],
      count: o.gridNodeCount,
      cvs: P2(c)
    });
    var f = 16;
    s === !1 && (f = 8), n += 176 + o.gridNodeCount * f;
  }
  return i;
}
function P2(e) {
  return e.map(function(a) {
    return [de(a.longitudeShift), de(a.latitudeShift)];
  });
}
function G2(e, a, t) {
  return {
    name: Ha(e, a + 8, a + 16).trim(),
    parent: Ha(e, a + 24, a + 24 + 8).trim(),
    lowerLatitude: e.getFloat64(a + 72, t),
    upperLatitude: e.getFloat64(a + 88, t),
    lowerLongitude: e.getFloat64(a + 104, t),
    upperLongitude: e.getFloat64(a + 120, t),
    latitudeInterval: e.getFloat64(a + 136, t),
    longitudeInterval: e.getFloat64(a + 152, t),
    gridNodeCount: e.getInt32(a + 168, t)
  };
}
function x2(e, a, t, s, n) {
  var i = a + 176, d = 16;
  n === !1 && (d = 8);
  for (var o = [], c = 0; c < t.gridNodeCount; c++) {
    var r = {
      latitudeShift: e.getFloat32(i + c * d, s),
      longitudeShift: e.getFloat32(i + c * d + 4, s)
    };
    n !== !1 && (r.latitudeAccuracy = e.getFloat32(i + c * d + 8, s), r.longitudeAccuracy = e.getFloat32(i + c * d + 12, s)), o.push(r);
  }
  return o;
}
function Q(e, a) {
  if (!(this instanceof Q))
    return new Q(e);
  this.forward = null, this.inverse = null, this.init = null, this.name, this.names = null, this.title, a = a || function(r) {
    if (r)
      throw r;
  };
  var t = i2(e);
  if (typeof t != "object") {
    a("Could not parse to valid json: " + e);
    return;
  }
  var s = Q.projections.get(t.projName);
  if (!s) {
    a("Could not get projection name from: " + e);
    return;
  }
  if (t.datumCode && t.datumCode !== "none") {
    var n = re(ua, t.datumCode);
    n && (t.datum_params = t.datum_params || (n.towgs84 ? n.towgs84.split(",") : null), t.ellps = n.ellipse, t.datumName = n.datumName ? n.datumName : t.datumCode);
  }
  t.k0 = t.k0 || 1, t.axis = t.axis || "enu", t.ellps = t.ellps || "wgs84", t.lat1 = t.lat1 || t.lat0;
  var i = _2(t.a, t.b, t.rf, t.ellps, t.sphere), d = p2(i.a, i.b, i.rf, t.R_A), o = B2(t.nadgrids), c = t.datum || g2(
    t.datumCode,
    t.datum_params,
    i.a,
    i.b,
    d.es,
    d.ep2,
    o
  );
  xt(this, t), xt(this, s), this.a = i.a, this.b = i.b, this.rf = i.rf, this.sphere = i.sphere, this.es = d.es, this.e = d.e, this.ep2 = d.ep2, this.datum = c, "init" in this && typeof this.init == "function" && this.init(), a(null, this);
}
Q.projections = w2;
Q.projections.start();
function U2(e, a) {
  return e.datum_type !== a.datum_type || e.a !== a.a || Math.abs(e.es - a.es) > 5e-11 ? !1 : e.datum_type === ue ? e.datum_params[0] === a.datum_params[0] && e.datum_params[1] === a.datum_params[1] && e.datum_params[2] === a.datum_params[2] : e.datum_type === be ? e.datum_params[0] === a.datum_params[0] && e.datum_params[1] === a.datum_params[1] && e.datum_params[2] === a.datum_params[2] && e.datum_params[3] === a.datum_params[3] && e.datum_params[4] === a.datum_params[4] && e.datum_params[5] === a.datum_params[5] && e.datum_params[6] === a.datum_params[6] : !0;
}
function gs(e, a, t) {
  var s = e.x, n = e.y, i = e.z ? e.z : 0, d, o, c, r;
  if (n < -_ && n > -1.001 * _)
    n = -_;
  else if (n > _ && n < 1.001 * _)
    n = _;
  else {
    if (n < -_)
      return { x: -1 / 0, y: -1 / 0, z: e.z };
    if (n > _)
      return { x: 1 / 0, y: 1 / 0, z: e.z };
  }
  return s > Math.PI && (s -= 2 * Math.PI), o = Math.sin(n), r = Math.cos(n), c = o * o, d = t / Math.sqrt(1 - a * c), {
    x: (d + i) * r * Math.cos(s),
    y: (d + i) * r * Math.sin(s),
    z: (d * (1 - a) + i) * o
  };
}
function ys(e, a, t, s) {
  var n = 1e-12, i = n * n, d = 30, o, c, r, l, f, h, u, m, b, w, p, v, C, k = e.x, g = e.y, B = e.z ? e.z : 0, S, A, E;
  if (o = Math.sqrt(k * k + g * g), c = Math.sqrt(k * k + g * g + B * B), o / t < n) {
    if (S = 0, c / t < n)
      return A = _, E = -s, {
        x: e.x,
        y: e.y,
        z: e.z
      };
  } else
    S = Math.atan2(g, k);
  r = B / c, l = o / c, f = 1 / Math.sqrt(1 - a * (2 - a) * l * l), m = l * (1 - a) * f, b = r * f, C = 0;
  do
    C++, u = t / Math.sqrt(1 - a * b * b), E = o * m + B * b - u * (1 - a * b * b), h = a * u / (u + E), f = 1 / Math.sqrt(1 - h * (2 - h) * l * l), w = l * (1 - h) * f, p = r * f, v = p * m - w * b, m = w, b = p;
  while (v * v > i && C < d);
  return A = Math.atan(p / Math.abs(w)), {
    x: S,
    y: A,
    z: E
  };
}
function I2(e, a, t) {
  if (a === ue)
    return {
      x: e.x + t[0],
      y: e.y + t[1],
      z: e.z + t[2]
    };
  if (a === be) {
    var s = t[0], n = t[1], i = t[2], d = t[3], o = t[4], c = t[5], r = t[6];
    return {
      x: r * (e.x - c * e.y + o * e.z) + s,
      y: r * (c * e.x + e.y - d * e.z) + n,
      z: r * (-o * e.x + d * e.y + e.z) + i
    };
  }
}
function T2(e, a, t) {
  if (a === ue)
    return {
      x: e.x - t[0],
      y: e.y - t[1],
      z: e.z - t[2]
    };
  if (a === be) {
    var s = t[0], n = t[1], i = t[2], d = t[3], o = t[4], c = t[5], r = t[6], l = (e.x - s) / r, f = (e.y - n) / r, h = (e.z - i) / r;
    return {
      x: l + c * f - o * h,
      y: -c * l + f + d * h,
      z: o * l - d * f + h
    };
  }
}
function ha(e) {
  return e === ue || e === be;
}
function N2(e, a, t) {
  if (U2(e, a) || e.datum_type === qa || a.datum_type === qa)
    return t;
  var s = e.a, n = e.es;
  if (e.datum_type === Be) {
    var i = Tt(e, !1, t);
    if (i !== 0)
      return;
    s = Bt, n = kt;
  }
  var d = a.a, o = a.b, c = a.es;
  if (a.datum_type === Be && (d = Bt, o = T1, c = kt), n === c && s === d && !ha(e.datum_type) && !ha(a.datum_type))
    return t;
  if (t = gs(t, n, s), ha(e.datum_type) && (t = I2(t, e.datum_type, e.datum_params)), ha(a.datum_type) && (t = T2(t, a.datum_type, a.datum_params)), t = ys(t, c, d, o), a.datum_type === Be) {
    var r = Tt(a, !0, t);
    if (r !== 0)
      return;
  }
  return t;
}
function Tt(e, a, t) {
  if (e.grids === null || e.grids.length === 0)
    return console.log("Grid shift grids not found"), -1;
  var s = { x: -t.x, y: t.y }, n = { x: Number.NaN, y: Number.NaN }, i = [];
  e:
    for (var d = 0; d < e.grids.length; d++) {
      var o = e.grids[d];
      if (i.push(o.name), o.isNull) {
        n = s;
        break;
      }
      if (o.grid === null) {
        if (o.mandatory)
          return console.log("Unable to find mandatory grid '" + o.name + "'"), -1;
        continue;
      }
      for (var c = o.grid.subgrids, r = 0, l = c.length; r < l; r++) {
        var f = c[r], h = (Math.abs(f.del[1]) + Math.abs(f.del[0])) / 1e4, u = f.ll[0] - h, m = f.ll[1] - h, b = f.ll[0] + (f.lim[0] - 1) * f.del[0] + h, w = f.ll[1] + (f.lim[1] - 1) * f.del[1] + h;
        if (!(m > s.y || u > s.x || w < s.y || b < s.x) && (n = j2(s, a, f), !isNaN(n.x)))
          break e;
      }
    }
  return isNaN(n.x) ? (console.log("Failed to find a grid shift table for location '" + -s.x * $ + " " + s.y * $ + " tried: '" + i + "'"), -1) : (t.x = -n.x, t.y = n.y, 0);
}
function j2(e, a, t) {
  var s = { x: Number.NaN, y: Number.NaN };
  if (isNaN(e.x))
    return s;
  var n = { x: e.x, y: e.y };
  n.x -= t.ll[0], n.y -= t.ll[1], n.x = M(n.x - Math.PI) + Math.PI;
  var i = Nt(n, t);
  if (a) {
    if (isNaN(i.x))
      return s;
    i.x = n.x - i.x, i.y = n.y - i.y;
    var d = 9, o = 1e-12, c, r;
    do {
      if (r = Nt(i, t), isNaN(r.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      c = { x: n.x - (r.x + i.x), y: n.y - (r.y + i.y) }, i.x += c.x, i.y += c.y;
    } while (d-- && Math.abs(c.x) > o && Math.abs(c.y) > o);
    if (d < 0)
      return console.log("Inverse grid shift iterator failed to converge."), s;
    s.x = M(i.x + t.ll[0]), s.y = i.y + t.ll[1];
  } else
    isNaN(i.x) || (s.x = e.x + i.x, s.y = e.y + i.y);
  return s;
}
function Nt(e, a) {
  var t = { x: e.x / a.del[0], y: e.y / a.del[1] }, s = { x: Math.floor(t.x), y: Math.floor(t.y) }, n = { x: t.x - 1 * s.x, y: t.y - 1 * s.y }, i = { x: Number.NaN, y: Number.NaN }, d;
  if (s.x < 0 || s.x >= a.lim[0] || s.y < 0 || s.y >= a.lim[1])
    return i;
  d = s.y * a.lim[0] + s.x;
  var o = { x: a.cvs[d][0], y: a.cvs[d][1] };
  d++;
  var c = { x: a.cvs[d][0], y: a.cvs[d][1] };
  d += a.lim[0];
  var r = { x: a.cvs[d][0], y: a.cvs[d][1] };
  d--;
  var l = { x: a.cvs[d][0], y: a.cvs[d][1] }, f = n.x * n.y, h = n.x * (1 - n.y), u = (1 - n.x) * (1 - n.y), m = (1 - n.x) * n.y;
  return i.x = u * o.x + h * c.x + m * l.x + f * r.x, i.y = u * o.y + h * c.y + m * l.y + f * r.y, i;
}
function jt(e, a, t) {
  var s = t.x, n = t.y, i = t.z || 0, d, o, c, r = {};
  for (c = 0; c < 3; c++)
    if (!(a && c === 2 && t.z === void 0))
      switch (c === 0 ? (d = s, "ew".indexOf(e.axis[c]) !== -1 ? o = "x" : o = "y") : c === 1 ? (d = n, "ns".indexOf(e.axis[c]) !== -1 ? o = "y" : o = "x") : (d = i, o = "z"), e.axis[c]) {
        case "e":
          r[o] = d;
          break;
        case "w":
          r[o] = -d;
          break;
        case "n":
          r[o] = d;
          break;
        case "s":
          r[o] = -d;
          break;
        case "u":
          t[o] !== void 0 && (r.z = d);
          break;
        case "d":
          t[o] !== void 0 && (r.z = -d);
          break;
        default:
          return null;
      }
  return r;
}
function Ms(e) {
  var a = {
    x: e[0],
    y: e[1]
  };
  return e.length > 2 && (a.z = e[2]), e.length > 3 && (a.m = e[3]), a;
}
function R2(e) {
  Rt(e.x), Rt(e.y);
}
function Rt(e) {
  if (typeof Number.isFinite == "function") {
    if (Number.isFinite(e))
      return;
    throw new TypeError("coordinates must be finite numbers");
  }
  if (typeof e != "number" || e !== e || !isFinite(e))
    throw new TypeError("coordinates must be finite numbers");
}
function O2(e, a) {
  return (e.datum.datum_type === ue || e.datum.datum_type === be || e.datum.datum_type === Be) && a.datumCode !== "WGS84" || (a.datum.datum_type === ue || a.datum.datum_type === be || a.datum.datum_type === Be) && e.datumCode !== "WGS84";
}
function ya(e, a, t, s) {
  var n;
  Array.isArray(t) ? t = Ms(t) : t = {
    x: t.x,
    y: t.y,
    z: t.z,
    m: t.m
  };
  var i = t.z !== void 0;
  if (R2(t), e.datum && a.datum && O2(e, a) && (n = new Q("WGS84"), t = ya(e, n, t, s), e = n), s && e.axis !== "enu" && (t = jt(e, !1, t)), e.projName === "longlat")
    t = {
      x: t.x * U,
      y: t.y * U,
      z: t.z || 0
    };
  else if (e.to_meter && (t = {
    x: t.x * e.to_meter,
    y: t.y * e.to_meter,
    z: t.z || 0
  }), t = e.inverse(t), !t)
    return;
  if (e.from_greenwich && (t.x += e.from_greenwich), t = N2(e.datum, a.datum, t), !!t)
    return t = /** @type {import('./core').InterfaceCoordinates} */
    t, a.from_greenwich && (t = {
      x: t.x - a.from_greenwich,
      y: t.y,
      z: t.z || 0
    }), a.projName === "longlat" ? t = {
      x: t.x * $,
      y: t.y * $,
      z: t.z || 0
    } : (t = a.forward(t), a.to_meter && (t = {
      x: t.x / a.to_meter,
      y: t.y / a.to_meter,
      z: t.z || 0
    })), s && a.axis !== "enu" ? jt(a, !0, t) : (t && !i && a.projName !== "geocent" && delete t.z, t);
}
var Ot = Q("WGS84");
function Oa(e, a, t, s) {
  var n, i, d;
  return Array.isArray(t) ? (n = ya(e, a, t, s) || { x: NaN, y: NaN }, t.length > 2 ? typeof e.name < "u" && e.name === "geocent" || typeof a.name < "u" && a.name === "geocent" ? typeof n.z == "number" ? (
    /** @type {T} */
    [n.x, n.y, n.z].concat(t.slice(3))
  ) : (
    /** @type {T} */
    [n.x, n.y, t[2]].concat(t.slice(3))
  ) : (
    /** @type {T} */
    [n.x, n.y].concat(t.slice(2))
  ) : (
    /** @type {T} */
    [n.x, n.y]
  )) : (i = ya(e, a, t, s), d = Object.keys(t), d.length === 2 || d.forEach(function(o) {
    if (typeof e.name < "u" && e.name === "geocent" || typeof a.name < "u" && a.name === "geocent") {
      if (o === "x" || o === "y" || o === "z")
        return;
    } else if (o === "x" || o === "y")
      return;
    i[o] = t[o];
  }), /** @type {T} */
  i);
}
function fa(e) {
  return e instanceof Q ? e : typeof e == "object" && "oProj" in e ? e.oProj : Q(
    /** @type {string | PROJJSONDefinition} */
    e
  );
}
function D2(e, a, t) {
  var s, n, i = !1, d;
  return typeof a > "u" ? (n = fa(e), s = Ot, i = !0) : (typeof /** @type {?} */
  a.x < "u" || Array.isArray(a)) && (t = /** @type {T} */
  /** @type {?} */
  a, n = fa(e), s = Ot, i = !0), s || (s = fa(e)), n || (n = fa(
    /** @type {string | PROJJSONDefinition | proj } */
    a
  )), t ? Oa(s, n, t) : (d = {
    /**
     * @template {TemplateCoordinates} T
     * @param {T} coords
     * @param {boolean=} enforceAxis
     * @returns {T}
     */
    forward: function(o, c) {
      return Oa(s, n, o, c);
    },
    /**
     * @template {TemplateCoordinates} T
     * @param {T} coords
     * @param {boolean=} enforceAxis
     * @returns {T}
     */
    inverse: function(o, c) {
      return Oa(n, s, o, c);
    }
  }, i && (d.oProj = n), d);
}
var Dt = 6, Cs = "AJSAJS", Bs = "AFAFAF", ye = 65, L = 73, J = 79, Re = 86, Oe = 90, F2 = {
  forward: ks,
  inverse: L2,
  toPoint: Ss
};
function ks(e, a) {
  return a = a || 5, H2(q2({
    lat: e[1],
    lon: e[0]
  }), a);
}
function L2(e) {
  var a = ht(As(e.toUpperCase()));
  return a.lat && a.lon ? [a.lon, a.lat, a.lon, a.lat] : [a.left, a.bottom, a.right, a.top];
}
function Ss(e) {
  var a = ht(As(e.toUpperCase()));
  return a.lat && a.lon ? [a.lon, a.lat] : [(a.left + a.right) / 2, (a.top + a.bottom) / 2];
}
function Da(e) {
  return e * (Math.PI / 180);
}
function Ft(e) {
  return 180 * (e / Math.PI);
}
function q2(e) {
  var a = e.lat, t = e.lon, s = 6378137, n = 669438e-8, i = 0.9996, d, o, c, r, l, f, h, u = Da(a), m = Da(t), b, w;
  w = Math.floor((t + 180) / 6) + 1, t === 180 && (w = 60), a >= 56 && a < 64 && t >= 3 && t < 12 && (w = 32), a >= 72 && a < 84 && (t >= 0 && t < 9 ? w = 31 : t >= 9 && t < 21 ? w = 33 : t >= 21 && t < 33 ? w = 35 : t >= 33 && t < 42 && (w = 37)), d = (w - 1) * 6 - 180 + 3, b = Da(d), o = n / (1 - n), c = s / Math.sqrt(1 - n * Math.sin(u) * Math.sin(u)), r = Math.tan(u) * Math.tan(u), l = o * Math.cos(u) * Math.cos(u), f = Math.cos(u) * (m - b), h = s * ((1 - n / 4 - 3 * n * n / 64 - 5 * n * n * n / 256) * u - (3 * n / 8 + 3 * n * n / 32 + 45 * n * n * n / 1024) * Math.sin(2 * u) + (15 * n * n / 256 + 45 * n * n * n / 1024) * Math.sin(4 * u) - 35 * n * n * n / 3072 * Math.sin(6 * u));
  var p = i * c * (f + (1 - r + l) * f * f * f / 6 + (5 - 18 * r + r * r + 72 * l - 58 * o) * f * f * f * f * f / 120) + 5e5, v = i * (h + c * Math.tan(u) * (f * f / 2 + (5 - r + 9 * l + 4 * l * l) * f * f * f * f / 24 + (61 - 58 * r + r * r + 600 * l - 330 * o) * f * f * f * f * f * f / 720));
  return a < 0 && (v += 1e7), {
    northing: Math.round(v),
    easting: Math.round(p),
    zoneNumber: w,
    zoneLetter: V2(a)
  };
}
function ht(e) {
  var a = e.northing, t = e.easting, s = e.zoneLetter, n = e.zoneNumber;
  if (n < 0 || n > 60)
    return null;
  var i = 0.9996, d = 6378137, o = 669438e-8, c, r = (1 - Math.sqrt(1 - o)) / (1 + Math.sqrt(1 - o)), l, f, h, u, m, b, w, p, v, C = t - 5e5, k = a;
  s < "N" && (k -= 1e7), w = (n - 1) * 6 - 180 + 3, c = o / (1 - o), b = k / i, p = b / (d * (1 - o / 4 - 3 * o * o / 64 - 5 * o * o * o / 256)), v = p + (3 * r / 2 - 27 * r * r * r / 32) * Math.sin(2 * p) + (21 * r * r / 16 - 55 * r * r * r * r / 32) * Math.sin(4 * p) + 151 * r * r * r / 96 * Math.sin(6 * p), l = d / Math.sqrt(1 - o * Math.sin(v) * Math.sin(v)), f = Math.tan(v) * Math.tan(v), h = c * Math.cos(v) * Math.cos(v), u = d * (1 - o) / Math.pow(1 - o * Math.sin(v) * Math.sin(v), 1.5), m = C / (l * i);
  var g = v - l * Math.tan(v) / u * (m * m / 2 - (5 + 3 * f + 10 * h - 4 * h * h - 9 * c) * m * m * m * m / 24 + (61 + 90 * f + 298 * h + 45 * f * f - 252 * c - 3 * h * h) * m * m * m * m * m * m / 720);
  g = Ft(g);
  var B = (m - (1 + 2 * f + h) * m * m * m / 6 + (5 - 2 * h + 28 * f - 3 * h * h + 8 * c + 24 * f * f) * m * m * m * m * m / 120) / Math.cos(v);
  B = w + Ft(B);
  var S;
  if (e.accuracy) {
    var A = ht({
      northing: e.northing + e.accuracy,
      easting: e.easting + e.accuracy,
      zoneLetter: e.zoneLetter,
      zoneNumber: e.zoneNumber
    });
    S = {
      top: A.lat,
      right: A.lon,
      bottom: g,
      left: B
    };
  } else
    S = {
      lat: g,
      lon: B
    };
  return S;
}
function V2(e) {
  var a = "Z";
  return 84 >= e && e >= 72 ? a = "X" : 72 > e && e >= 64 ? a = "W" : 64 > e && e >= 56 ? a = "V" : 56 > e && e >= 48 ? a = "U" : 48 > e && e >= 40 ? a = "T" : 40 > e && e >= 32 ? a = "S" : 32 > e && e >= 24 ? a = "R" : 24 > e && e >= 16 ? a = "Q" : 16 > e && e >= 8 ? a = "P" : 8 > e && e >= 0 ? a = "N" : 0 > e && e >= -8 ? a = "M" : -8 > e && e >= -16 ? a = "L" : -16 > e && e >= -24 ? a = "K" : -24 > e && e >= -32 ? a = "J" : -32 > e && e >= -40 ? a = "H" : -40 > e && e >= -48 ? a = "G" : -48 > e && e >= -56 ? a = "F" : -56 > e && e >= -64 ? a = "E" : -64 > e && e >= -72 ? a = "D" : -72 > e && e >= -80 && (a = "C"), a;
}
function H2(e, a) {
  var t = "00000" + e.easting, s = "00000" + e.northing;
  return e.zoneNumber + e.zoneLetter + $2(e.easting, e.northing, e.zoneNumber) + t.substr(t.length - 5, a) + s.substr(s.length - 5, a);
}
function $2(e, a, t) {
  var s = Es(t), n = Math.floor(e / 1e5), i = Math.floor(a / 1e5) % 20;
  return K2(n, i, s);
}
function Es(e) {
  var a = e % Dt;
  return a === 0 && (a = Dt), a;
}
function K2(e, a, t) {
  var s = t - 1, n = Cs.charCodeAt(s), i = Bs.charCodeAt(s), d = n + e - 1, o = i + a, c = !1;
  d > Oe && (d = d - Oe + ye - 1, c = !0), (d === L || n < L && d > L || (d > L || n < L) && c) && d++, (d === J || n < J && d > J || (d > J || n < J) && c) && (d++, d === L && d++), d > Oe && (d = d - Oe + ye - 1), o > Re ? (o = o - Re + ye - 1, c = !0) : c = !1, (o === L || i < L && o > L || (o > L || i < L) && c) && o++, (o === J || i < J && o > J || (o > J || i < J) && c) && (o++, o === L && o++), o > Re && (o = o - Re + ye - 1);
  var r = String.fromCharCode(d) + String.fromCharCode(o);
  return r;
}
function As(e) {
  if (e && e.length === 0)
    throw "MGRSPoint coverting from nothing";
  for (var a = e.length, t = null, s = "", n, i = 0; !/[A-Z]/.test(n = e.charAt(i)); ) {
    if (i >= 2)
      throw "MGRSPoint bad conversion from: " + e;
    s += n, i++;
  }
  var d = parseInt(s, 10);
  if (i === 0 || i + 3 > a)
    throw "MGRSPoint bad conversion from: " + e;
  var o = e.charAt(i++);
  if (o <= "A" || o === "B" || o === "Y" || o >= "Z" || o === "I" || o === "O")
    throw "MGRSPoint zone letter " + o + " not handled: " + e;
  t = e.substring(i, i += 2);
  for (var c = Es(d), r = X2(t.charAt(0), c), l = Y2(t.charAt(1), c); l < W2(o); )
    l += 2e6;
  var f = a - i;
  if (f % 2 !== 0)
    throw `MGRSPoint has to have an even number 
of digits after the zone letter and two 100km letters - front 
half for easting meters, second half for 
northing meters` + e;
  var h = f / 2, u = 0, m = 0, b, w, p, v, C;
  return h > 0 && (b = 1e5 / Math.pow(10, h), w = e.substring(i, i + h), u = parseFloat(w) * b, p = e.substring(i + h), m = parseFloat(p) * b), v = u + r, C = m + l, {
    easting: v,
    northing: C,
    zoneLetter: o,
    zoneNumber: d,
    accuracy: b
  };
}
function X2(e, a) {
  for (var t = Cs.charCodeAt(a - 1), s = 1e5, n = !1; t !== e.charCodeAt(0); ) {
    if (t++, t === L && t++, t === J && t++, t > Oe) {
      if (n)
        throw "Bad character: " + e;
      t = ye, n = !0;
    }
    s += 1e5;
  }
  return s;
}
function Y2(e, a) {
  if (e > "V")
    throw "MGRSPoint given invalid Northing " + e;
  for (var t = Bs.charCodeAt(a - 1), s = 0, n = !1; t !== e.charCodeAt(0); ) {
    if (t++, t === L && t++, t === J && t++, t > Re) {
      if (n)
        throw "Bad character: " + e;
      t = ye, n = !0;
    }
    s += 1e5;
  }
  return s;
}
function W2(e) {
  var a;
  switch (e) {
    case "C":
      a = 11e5;
      break;
    case "D":
      a = 2e6;
      break;
    case "E":
      a = 28e5;
      break;
    case "F":
      a = 37e5;
      break;
    case "G":
      a = 46e5;
      break;
    case "H":
      a = 55e5;
      break;
    case "J":
      a = 64e5;
      break;
    case "K":
      a = 73e5;
      break;
    case "L":
      a = 82e5;
      break;
    case "M":
      a = 91e5;
      break;
    case "N":
      a = 0;
      break;
    case "P":
      a = 8e5;
      break;
    case "Q":
      a = 17e5;
      break;
    case "R":
      a = 26e5;
      break;
    case "S":
      a = 35e5;
      break;
    case "T":
      a = 44e5;
      break;
    case "U":
      a = 53e5;
      break;
    case "V":
      a = 62e5;
      break;
    case "W":
      a = 7e6;
      break;
    case "X":
      a = 79e5;
      break;
    default:
      a = -1;
  }
  if (a >= 0)
    return a;
  throw "Invalid zone letter: " + e;
}
function Se(e, a, t) {
  if (!(this instanceof Se))
    return new Se(e, a, t);
  if (Array.isArray(e))
    this.x = e[0], this.y = e[1], this.z = e[2] || 0;
  else if (typeof e == "object")
    this.x = e.x, this.y = e.y, this.z = e.z || 0;
  else if (typeof e == "string" && typeof a > "u") {
    var s = e.split(",");
    this.x = parseFloat(s[0]), this.y = parseFloat(s[1]), this.z = parseFloat(s[2]) || 0;
  } else
    this.x = e, this.y = a, this.z = t || 0;
  console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
Se.fromMGRS = function(e) {
  return new Se(Ss(e));
};
Se.prototype.toMGRS = function(e) {
  return ks([this.x, this.y], e);
};
var J2 = 1, Q2 = 0.25, Lt = 0.046875, qt = 0.01953125, Vt = 0.01068115234375, Z2 = 0.75, ei = 0.46875, ai = 0.013020833333333334, ti = 0.007120768229166667, si = 0.3645833333333333, ni = 0.005696614583333333, ii = 0.3076171875;
function ft(e) {
  var a = [];
  a[0] = J2 - e * (Q2 + e * (Lt + e * (qt + e * Vt))), a[1] = e * (Z2 - e * (Lt + e * (qt + e * Vt)));
  var t = e * e;
  return a[2] = t * (ei - e * (ai + e * ti)), t *= e, a[3] = t * (si - e * ni), a[4] = t * e * ii, a;
}
function Pe(e, a, t, s) {
  return t *= a, a *= a, s[0] * e - t * (s[1] + a * (s[2] + a * (s[3] + a * s[4])));
}
var oi = 20;
function lt(e, a, t) {
  for (var s = 1 / (1 - a), n = e, i = oi; i; --i) {
    var d = Math.sin(n), o = 1 - a * d * d;
    if (o = (Pe(n, d, Math.cos(n), t) - e) * (o * Math.sqrt(o)) * s, n -= o, Math.abs(o) < y)
      return n;
  }
  return n;
}
function di() {
  this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.es && (this.en = ft(this.es), this.ml0 = Pe(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
}
function ci(e) {
  var a = e.x, t = e.y, s = M(a - this.long0, this.over), n, i, d, o = Math.sin(t), c = Math.cos(t);
  if (this.es) {
    var l = c * s, f = Math.pow(l, 2), h = this.ep2 * Math.pow(c, 2), u = Math.pow(h, 2), m = Math.abs(c) > y ? Math.tan(t) : 0, b = Math.pow(m, 2), w = Math.pow(b, 2);
    n = 1 - this.es * Math.pow(o, 2), l = l / Math.sqrt(n);
    var p = Pe(t, o, c, this.en);
    i = this.a * (this.k0 * l * (1 + f / 6 * (1 - b + h + f / 20 * (5 - 18 * b + w + 14 * h - 58 * b * h + f / 42 * (61 + 179 * w - w * b - 479 * b))))) + this.x0, d = this.a * (this.k0 * (p - this.ml0 + o * s * l / 2 * (1 + f / 12 * (5 - b + 9 * h + 4 * u + f / 30 * (61 + w - 58 * b + 270 * h - 330 * b * h + f / 56 * (1385 + 543 * w - w * b - 3111 * b)))))) + this.y0;
  } else {
    var r = c * Math.sin(s);
    if (Math.abs(Math.abs(r) - 1) < y)
      return 93;
    if (i = 0.5 * this.a * this.k0 * Math.log((1 + r) / (1 - r)) + this.x0, d = c * Math.cos(s) / Math.sqrt(1 - Math.pow(r, 2)), r = Math.abs(d), r >= 1) {
      if (r - 1 > y)
        return 93;
      d = 0;
    } else
      d = Math.acos(d);
    t < 0 && (d = -d), d = this.a * this.k0 * (d - this.lat0) + this.y0;
  }
  return e.x = i, e.y = d, e;
}
function ri(e) {
  var a, t, s, n, i = (e.x - this.x0) * (1 / this.a), d = (e.y - this.y0) * (1 / this.a);
  if (this.es)
    if (a = this.ml0 + d / this.k0, t = lt(a, this.es, this.en), Math.abs(t) < _) {
      var f = Math.sin(t), h = Math.cos(t), u = Math.abs(h) > y ? Math.tan(t) : 0, m = this.ep2 * Math.pow(h, 2), b = Math.pow(m, 2), w = Math.pow(u, 2), p = Math.pow(w, 2);
      a = 1 - this.es * Math.pow(f, 2);
      var v = i * Math.sqrt(a) / this.k0, C = Math.pow(v, 2);
      a = a * u, s = t - a * C / (1 - this.es) * 0.5 * (1 - C / 12 * (5 + 3 * w - 9 * m * w + m - 4 * b - C / 30 * (61 + 90 * w - 252 * m * w + 45 * p + 46 * m - C / 56 * (1385 + 3633 * w + 4095 * p + 1574 * p * w)))), n = M(this.long0 + v * (1 - C / 6 * (1 + 2 * w + m - C / 20 * (5 + 28 * w + 24 * p + 8 * m * w + 6 * m - C / 42 * (61 + 662 * w + 1320 * p + 720 * p * w)))) / h, this.over);
    } else
      s = _ * aa(d), n = 0;
  else {
    var o = Math.exp(i / this.k0), c = 0.5 * (o - 1 / o), r = this.lat0 + d / this.k0, l = Math.cos(r);
    a = Math.sqrt((1 - Math.pow(l, 2)) / (1 + Math.pow(c, 2))), s = Math.asin(a), d < 0 && (s = -s), c === 0 && l === 0 ? n = 0 : n = M(Math.atan2(c, l) + this.long0, this.over);
  }
  return e.x = n, e.y = s, e;
}
var hi = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"], ba = {
  init: di,
  forward: ci,
  inverse: ri,
  names: hi
};
function Ps(e) {
  var a = Math.exp(e);
  return a = (a - 1 / a) / 2, a;
}
function V(e, a) {
  e = Math.abs(e), a = Math.abs(a);
  var t = Math.max(e, a), s = Math.min(e, a) / (t || 1);
  return t * Math.sqrt(1 + Math.pow(s, 2));
}
function fi(e) {
  var a = 1 + e, t = a - 1;
  return t === 0 ? e : e * Math.log(a) / t;
}
function li(e) {
  var a = Math.abs(e);
  return a = fi(a * (1 + a / (V(1, a) + 1))), e < 0 ? -a : a;
}
function mt(e, a) {
  for (var t = 2 * Math.cos(2 * a), s = e.length - 1, n = e[s], i = 0, d; --s >= 0; )
    d = -i + t * n + e[s], i = n, n = d;
  return a + d * Math.sin(2 * a);
}
function mi(e, a) {
  for (var t = 2 * Math.cos(a), s = e.length - 1, n = e[s], i = 0, d; --s >= 0; )
    d = -i + t * n + e[s], i = n, n = d;
  return Math.sin(a) * d;
}
function ui(e) {
  var a = Math.exp(e);
  return a = (a + 1 / a) / 2, a;
}
function Gs(e, a, t) {
  for (var s = Math.sin(a), n = Math.cos(a), i = Ps(t), d = ui(t), o = 2 * n * d, c = -2 * s * i, r = e.length - 1, l = e[r], f = 0, h = 0, u = 0, m, b; --r >= 0; )
    m = h, b = f, h = l, f = u, l = -m + o * h - c * f + e[r], u = -b + c * h + o * f;
  return o = s * d, c = n * i, [o * l - c * u, o * u + c * l];
}
function bi() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0))
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  this.approx && (ba.init.apply(this), this.forward = ba.forward, this.inverse = ba.inverse), this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
  var e = this.es / (1 + Math.sqrt(1 - this.es)), a = e / (2 - e), t = a;
  this.cgb[0] = a * (2 + a * (-2 / 3 + a * (-2 + a * (116 / 45 + a * (26 / 45 + a * (-2854 / 675)))))), this.cbg[0] = a * (-2 + a * (2 / 3 + a * (4 / 3 + a * (-82 / 45 + a * (32 / 45 + a * (4642 / 4725)))))), t = t * a, this.cgb[1] = t * (7 / 3 + a * (-8 / 5 + a * (-227 / 45 + a * (2704 / 315 + a * (2323 / 945))))), this.cbg[1] = t * (5 / 3 + a * (-16 / 15 + a * (-13 / 9 + a * (904 / 315 + a * (-1522 / 945))))), t = t * a, this.cgb[2] = t * (56 / 15 + a * (-136 / 35 + a * (-1262 / 105 + a * (73814 / 2835)))), this.cbg[2] = t * (-26 / 15 + a * (34 / 21 + a * (8 / 5 + a * (-12686 / 2835)))), t = t * a, this.cgb[3] = t * (4279 / 630 + a * (-332 / 35 + a * (-399572 / 14175))), this.cbg[3] = t * (1237 / 630 + a * (-12 / 5 + a * (-24832 / 14175))), t = t * a, this.cgb[4] = t * (4174 / 315 + a * (-144838 / 6237)), this.cbg[4] = t * (-734 / 315 + a * (109598 / 31185)), t = t * a, this.cgb[5] = t * (601676 / 22275), this.cbg[5] = t * (444337 / 155925), t = Math.pow(a, 2), this.Qn = this.k0 / (1 + a) * (1 + t * (1 / 4 + t * (1 / 64 + t / 256))), this.utg[0] = a * (-0.5 + a * (2 / 3 + a * (-37 / 96 + a * (1 / 360 + a * (81 / 512 + a * (-96199 / 604800)))))), this.gtu[0] = a * (0.5 + a * (-2 / 3 + a * (5 / 16 + a * (41 / 180 + a * (-127 / 288 + a * (7891 / 37800)))))), this.utg[1] = t * (-1 / 48 + a * (-1 / 15 + a * (437 / 1440 + a * (-46 / 105 + a * (1118711 / 3870720))))), this.gtu[1] = t * (13 / 48 + a * (-3 / 5 + a * (557 / 1440 + a * (281 / 630 + a * (-1983433 / 1935360))))), t = t * a, this.utg[2] = t * (-17 / 480 + a * (37 / 840 + a * (209 / 4480 + a * (-5569 / 90720)))), this.gtu[2] = t * (61 / 240 + a * (-103 / 140 + a * (15061 / 26880 + a * (167603 / 181440)))), t = t * a, this.utg[3] = t * (-4397 / 161280 + a * (11 / 504 + a * (830251 / 7257600))), this.gtu[3] = t * (49561 / 161280 + a * (-179 / 168 + a * (6601661 / 7257600))), t = t * a, this.utg[4] = t * (-4583 / 161280 + a * (108847 / 3991680)), this.gtu[4] = t * (34729 / 80640 + a * (-3418889 / 1995840)), t = t * a, this.utg[5] = t * (-20648693 / 638668800), this.gtu[5] = t * (212378941 / 319334400);
  var s = mt(this.cbg, this.lat0);
  this.Zb = -this.Qn * (s + mi(this.gtu, 2 * s));
}
function wi(e) {
  var a = M(e.x - this.long0, this.over), t = e.y;
  t = mt(this.cbg, t);
  var s = Math.sin(t), n = Math.cos(t), i = Math.sin(a), d = Math.cos(a);
  t = Math.atan2(s, d * n), a = Math.atan2(i * n, V(s, n * d)), a = li(Math.tan(a));
  var o = Gs(this.gtu, 2 * t, 2 * a);
  t = t + o[0], a = a + o[1];
  var c, r;
  return Math.abs(a) <= 2.623395162778 ? (c = this.a * (this.Qn * a) + this.x0, r = this.a * (this.Qn * t + this.Zb) + this.y0) : (c = 1 / 0, r = 1 / 0), e.x = c, e.y = r, e;
}
function zi(e) {
  var a = (e.x - this.x0) * (1 / this.a), t = (e.y - this.y0) * (1 / this.a);
  t = (t - this.Zb) / this.Qn, a = a / this.Qn;
  var s, n;
  if (Math.abs(a) <= 2.623395162778) {
    var i = Gs(this.utg, 2 * t, 2 * a);
    t = t + i[0], a = a + i[1], a = Math.atan(Ps(a));
    var d = Math.sin(t), o = Math.cos(t), c = Math.sin(a), r = Math.cos(a);
    t = Math.atan2(d * r, V(c, r * o)), a = Math.atan2(c, r * o), s = M(a + this.long0, this.over), n = mt(this.cgb, t);
  } else
    s = 1 / 0, n = 1 / 0;
  return e.x = s, e.y = n, e;
}
var pi = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"], wa = {
  init: bi,
  forward: wi,
  inverse: zi,
  names: pi
};
function _i(e, a) {
  if (e === void 0) {
    if (e = Math.floor((M(a) + Math.PI) * 30 / Math.PI) + 1, e < 0)
      return 0;
    if (e > 60)
      return 60;
  }
  return e;
}
var vi = "etmerc";
function gi() {
  var e = _i(this.zone, this.long0);
  if (e === void 0)
    throw new Error("unknown utm zone");
  this.lat0 = 0, this.long0 = (6 * Math.abs(e) - 183) * U, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = 0.9996, wa.init.apply(this), this.forward = wa.forward, this.inverse = wa.inverse;
}
var yi = ["Universal Transverse Mercator System", "utm"], Mi = {
  init: gi,
  names: yi,
  dependsOn: vi
};
function ut(e, a) {
  return Math.pow((1 - e) / (1 + e), a);
}
var Ci = 20;
function Bi() {
  var e = Math.sin(this.lat0), a = Math.cos(this.lat0);
  a *= a, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * e * e), this.C = Math.sqrt(1 + this.es * a * a / (1 - this.es)), this.phic0 = Math.asin(e / this.C), this.ratexp = 0.5 * this.C * this.e, this.K = Math.tan(0.5 * this.phic0 + P) / (Math.pow(Math.tan(0.5 * this.lat0 + P), this.C) * ut(this.e * e, this.ratexp));
}
function ki(e) {
  var a = e.x, t = e.y;
  return e.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * t + P), this.C) * ut(this.e * Math.sin(t), this.ratexp)) - _, e.x = this.C * a, e;
}
function Si(e) {
  for (var a = 1e-14, t = e.x / this.C, s = e.y, n = Math.pow(Math.tan(0.5 * s + P) / this.K, 1 / this.C), i = Ci; i > 0 && (s = 2 * Math.atan(n * ut(this.e * Math.sin(e.y), -0.5 * this.e)) - _, !(Math.abs(s - e.y) < a)); --i)
    e.y = s;
  return i ? (e.x = t, e.y = s, e) : null;
}
var bt = {
  init: Bi,
  forward: ki,
  inverse: Si
};
function Ei() {
  bt.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"));
}
function Ai(e) {
  var a, t, s, n;
  return e.x = M(e.x - this.long0, this.over), bt.forward.apply(this, [e]), a = Math.sin(e.y), t = Math.cos(e.y), s = Math.cos(e.x), n = this.k0 * this.R2 / (1 + this.sinc0 * a + this.cosc0 * t * s), e.x = n * t * Math.sin(e.x), e.y = n * (this.cosc0 * a - this.sinc0 * t * s), e.x = this.a * e.x + this.x0, e.y = this.a * e.y + this.y0, e;
}
function Pi(e) {
  var a, t, s, n, i;
  if (e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, e.x /= this.k0, e.y /= this.k0, i = V(e.x, e.y)) {
    var d = 2 * Math.atan2(i, this.R2);
    a = Math.sin(d), t = Math.cos(d), n = Math.asin(t * this.sinc0 + e.y * a * this.cosc0 / i), s = Math.atan2(e.x * a, i * this.cosc0 * t - e.y * this.sinc0 * a);
  } else
    n = this.phic0, s = 0;
  return e.x = s, e.y = n, bt.inverse.apply(this, [e]), e.x = M(e.x + this.long0, this.over), e;
}
var Gi = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"], xi = {
  init: Ei,
  forward: Ai,
  inverse: Pi,
  names: Gi
};
function wt(e, a, t) {
  return a *= t, Math.tan(0.5 * (_ + e)) * Math.pow((1 - a) / (1 + a), 0.5 * t);
}
function Ui() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= y && (this.k0 = 0.5 * (1 + aa(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= y && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= y && Math.abs(Math.cos(this.lat_ts)) > y && (this.k0 = 0.5 * this.cons * ie(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / ae(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = ie(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(wt(this.lat0, this.sinlat0, this.e)) - _, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0));
}
function Ii(e) {
  var a = e.x, t = e.y, s = Math.sin(t), n = Math.cos(t), i, d, o, c, r, l, f = M(a - this.long0, this.over);
  return Math.abs(Math.abs(a - this.long0) - Math.PI) <= y && Math.abs(t + this.lat0) <= y ? (e.x = NaN, e.y = NaN, e) : this.sphere ? (i = 2 * this.k0 / (1 + this.sinlat0 * s + this.coslat0 * n * Math.cos(f)), e.x = this.a * i * n * Math.sin(f) + this.x0, e.y = this.a * i * (this.coslat0 * s - this.sinlat0 * n * Math.cos(f)) + this.y0, e) : (d = 2 * Math.atan(wt(t, s, this.e)) - _, c = Math.cos(d), o = Math.sin(d), Math.abs(this.coslat0) <= y ? (r = ae(this.e, t * this.con, this.con * s), l = 2 * this.a * this.k0 * r / this.cons, e.x = this.x0 + l * Math.sin(a - this.long0), e.y = this.y0 - this.con * l * Math.cos(a - this.long0), e) : (Math.abs(this.sinlat0) < y ? (i = 2 * this.a * this.k0 / (1 + c * Math.cos(f)), e.y = i * o) : (i = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * o + this.cosX0 * c * Math.cos(f))), e.y = i * (this.cosX0 * o - this.sinX0 * c * Math.cos(f)) + this.y0), e.x = i * c * Math.sin(f) + this.x0, e));
}
function Ti(e) {
  e.x -= this.x0, e.y -= this.y0;
  var a, t, s, n, i, d = Math.sqrt(e.x * e.x + e.y * e.y);
  if (this.sphere) {
    var o = 2 * Math.atan(d / (2 * this.a * this.k0));
    return a = this.long0, t = this.lat0, d <= y ? (e.x = a, e.y = t, e) : (t = Math.asin(Math.cos(o) * this.sinlat0 + e.y * Math.sin(o) * this.coslat0 / d), Math.abs(this.coslat0) < y ? this.lat0 > 0 ? a = M(this.long0 + Math.atan2(e.x, -1 * e.y), this.over) : a = M(this.long0 + Math.atan2(e.x, e.y), this.over) : a = M(this.long0 + Math.atan2(e.x * Math.sin(o), d * this.coslat0 * Math.cos(o) - e.y * this.sinlat0 * Math.sin(o)), this.over), e.x = a, e.y = t, e);
  } else if (Math.abs(this.coslat0) <= y) {
    if (d <= y)
      return t = this.lat0, a = this.long0, e.x = a, e.y = t, e;
    e.x *= this.con, e.y *= this.con, s = d * this.cons / (2 * this.a * this.k0), t = this.con * Qe(this.e, s), a = this.con * M(this.con * this.long0 + Math.atan2(e.x, -1 * e.y), this.over);
  } else
    n = 2 * Math.atan(d * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), a = this.long0, d <= y ? i = this.X0 : (i = Math.asin(Math.cos(n) * this.sinX0 + e.y * Math.sin(n) * this.cosX0 / d), a = M(this.long0 + Math.atan2(e.x * Math.sin(n), d * this.cosX0 * Math.cos(n) - e.y * this.sinX0 * Math.sin(n)), this.over)), t = -1 * Qe(this.e, Math.tan(0.5 * (_ + i)));
  return e.x = a, e.y = t, e;
}
var Ni = ["stere", "Stereographic_South_Pole", "Polar_Stereographic_variant_A", "Polar_Stereographic_variant_B", "Polar_Stereographic"], ji = {
  init: Ui,
  forward: Ii,
  inverse: Ti,
  names: Ni,
  ssfn_: wt
};
function Ri() {
  var e = this.lat0;
  this.lambda0 = this.long0;
  var a = Math.sin(e), t = this.a, s = this.rf, n = 1 / s, i = 2 * n - Math.pow(n, 2), d = this.e = Math.sqrt(i);
  this.R = this.k0 * t * Math.sqrt(1 - i) / (1 - i * Math.pow(a, 2)), this.alpha = Math.sqrt(1 + i / (1 - i) * Math.pow(Math.cos(e), 4)), this.b0 = Math.asin(a / this.alpha);
  var o = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)), c = Math.log(Math.tan(Math.PI / 4 + e / 2)), r = Math.log((1 + d * a) / (1 - d * a));
  this.K = o - this.alpha * c + this.alpha * d / 2 * r;
}
function Oi(e) {
  var a = Math.log(Math.tan(Math.PI / 4 - e.y / 2)), t = this.e / 2 * Math.log((1 + this.e * Math.sin(e.y)) / (1 - this.e * Math.sin(e.y))), s = -this.alpha * (a + t) + this.K, n = 2 * (Math.atan(Math.exp(s)) - Math.PI / 4), i = this.alpha * (e.x - this.lambda0), d = Math.atan(Math.sin(i) / (Math.sin(this.b0) * Math.tan(n) + Math.cos(this.b0) * Math.cos(i))), o = Math.asin(Math.cos(this.b0) * Math.sin(n) - Math.sin(this.b0) * Math.cos(n) * Math.cos(i));
  return e.y = this.R / 2 * Math.log((1 + Math.sin(o)) / (1 - Math.sin(o))) + this.y0, e.x = this.R * d + this.x0, e;
}
function Di(e) {
  for (var a = e.x - this.x0, t = e.y - this.y0, s = a / this.R, n = 2 * (Math.atan(Math.exp(t / this.R)) - Math.PI / 4), i = Math.asin(Math.cos(this.b0) * Math.sin(n) + Math.sin(this.b0) * Math.cos(n) * Math.cos(s)), d = Math.atan(Math.sin(s) / (Math.cos(this.b0) * Math.cos(s) - Math.sin(this.b0) * Math.tan(n))), o = this.lambda0 + d / this.alpha, c = 0, r = i, l = -1e3, f = 0; Math.abs(r - l) > 1e-7; ) {
    if (++f > 20)
      return;
    c = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + i / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(r)) / 2)), l = r, r = 2 * Math.atan(Math.exp(c)) - Math.PI / 2;
  }
  return e.x = o, e.y = r, e;
}
var Fi = ["somerc"], Li = {
  init: Ri,
  forward: Oi,
  inverse: Di,
  names: Fi
}, ze = 1e-7;
function qi(e) {
  var a = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"], t = typeof e.projName == "object" ? Object.keys(e.projName)[0] : e.projName;
  return "no_uoff" in e || "no_off" in e || a.indexOf(t) !== -1 || a.indexOf(_s(t)) !== -1;
}
function Vi() {
  var e, a, t, s, n, i, d, o, c, r, l = 0, f, h = 0, u = 0, m = 0, b = 0, w = 0, p = 0;
  this.no_off = qi(this), this.no_rot = "no_rot" in this;
  var v = !1;
  "alpha" in this && (v = !0);
  var C = !1;
  if ("rectified_grid_angle" in this && (C = !0), v && (p = this.alpha), C && (l = this.rectified_grid_angle), v || C)
    h = this.longc;
  else if (u = this.long1, b = this.lat1, m = this.long2, w = this.lat2, Math.abs(b - w) <= ze || (e = Math.abs(b)) <= ze || Math.abs(e - _) <= ze || Math.abs(Math.abs(this.lat0) - _) <= ze || Math.abs(Math.abs(w) - _) <= ze)
    throw new Error();
  var k = 1 - this.es;
  a = Math.sqrt(k), Math.abs(this.lat0) > y ? (o = Math.sin(this.lat0), t = Math.cos(this.lat0), e = 1 - this.es * o * o, this.B = t * t, this.B = Math.sqrt(1 + this.es * this.B * this.B / k), this.A = this.B * this.k0 * a / e, s = this.B * a / (t * Math.sqrt(e)), n = s * s - 1, n <= 0 ? n = 0 : (n = Math.sqrt(n), this.lat0 < 0 && (n = -n)), this.E = n += s, this.E *= Math.pow(ae(this.e, this.lat0, o), this.B)) : (this.B = 1 / a, this.A = this.k0, this.E = s = n = 1), v || C ? (v ? (f = Math.asin(Math.sin(p) / s), C || (l = p)) : (f = l, p = Math.asin(s * Math.sin(f))), this.lam0 = h - Math.asin(0.5 * (n - 1 / n) * Math.tan(f)) / this.B) : (i = Math.pow(ae(this.e, b, Math.sin(b)), this.B), d = Math.pow(ae(this.e, w, Math.sin(w)), this.B), n = this.E / i, c = (d - i) / (d + i), r = this.E * this.E, r = (r - d * i) / (r + d * i), e = u - m, e < -Math.PI ? m -= We : e > Math.PI && (m += We), this.lam0 = M(0.5 * (u + m) - Math.atan(r * Math.tan(0.5 * this.B * (u - m)) / c) / this.B, this.over), f = Math.atan(2 * Math.sin(this.B * M(u - this.lam0, this.over)) / (n - 1 / n)), l = p = Math.asin(s * Math.sin(f))), this.singam = Math.sin(f), this.cosgam = Math.cos(f), this.sinrot = Math.sin(l), this.cosrot = Math.cos(l), this.rB = 1 / this.B, this.ArB = this.A * this.rB, this.BrA = 1 / this.ArB, this.no_off ? this.u_0 = 0 : (this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(s * s - 1) / Math.cos(p))), this.lat0 < 0 && (this.u_0 = -this.u_0)), n = 0.5 * f, this.v_pole_n = this.ArB * Math.log(Math.tan(P - n)), this.v_pole_s = this.ArB * Math.log(Math.tan(P + n));
}
function Hi(e) {
  var a = {}, t, s, n, i, d, o, c, r;
  if (e.x = e.x - this.lam0, Math.abs(Math.abs(e.y) - _) > y) {
    if (d = this.E / Math.pow(ae(this.e, e.y, Math.sin(e.y)), this.B), o = 1 / d, t = 0.5 * (d - o), s = 0.5 * (d + o), i = Math.sin(this.B * e.x), n = (t * this.singam - i * this.cosgam) / s, Math.abs(Math.abs(n) - 1) < y)
      throw new Error();
    r = 0.5 * this.ArB * Math.log((1 - n) / (1 + n)), o = Math.cos(this.B * e.x), Math.abs(o) < ze ? c = this.A * e.x : c = this.ArB * Math.atan2(t * this.cosgam + i * this.singam, o);
  } else
    r = e.y > 0 ? this.v_pole_n : this.v_pole_s, c = this.ArB * e.y;
  return this.no_rot ? (a.x = c, a.y = r) : (c -= this.u_0, a.x = r * this.cosrot + c * this.sinrot, a.y = c * this.cosrot - r * this.sinrot), a.x = this.a * a.x + this.x0, a.y = this.a * a.y + this.y0, a;
}
function $i(e) {
  var a, t, s, n, i, d, o, c = {};
  if (e.x = (e.x - this.x0) * (1 / this.a), e.y = (e.y - this.y0) * (1 / this.a), this.no_rot ? (t = e.y, a = e.x) : (t = e.x * this.cosrot - e.y * this.sinrot, a = e.y * this.cosrot + e.x * this.sinrot + this.u_0), s = Math.exp(-this.BrA * t), n = 0.5 * (s - 1 / s), i = 0.5 * (s + 1 / s), d = Math.sin(this.BrA * a), o = (d * this.cosgam + n * this.singam) / i, Math.abs(Math.abs(o) - 1) < y)
    c.x = 0, c.y = o < 0 ? -_ : _;
  else {
    if (c.y = this.E / Math.sqrt((1 + o) / (1 - o)), c.y = Qe(this.e, Math.pow(c.y, 1 / this.B)), c.y === 1 / 0)
      throw new Error();
    c.x = -this.rB * Math.atan2(n * this.cosgam - d * this.singam, Math.cos(this.BrA * a));
  }
  return c.x += this.lam0, c;
}
var Ki = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Variant_B", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"], Xi = {
  init: Vi,
  forward: Hi,
  inverse: $i,
  names: Ki
};
function Yi() {
  if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < y)) {
    var e = this.b / this.a;
    this.e = Math.sqrt(1 - e * e);
    var a = Math.sin(this.lat1), t = Math.cos(this.lat1), s = ie(this.e, a, t), n = ae(this.e, this.lat1, a), i = Math.sin(this.lat2), d = Math.cos(this.lat2), o = ie(this.e, i, d), c = ae(this.e, this.lat2, i), r = Math.abs(Math.abs(this.lat0) - _) < y ? 0 : ae(this.e, this.lat0, Math.sin(this.lat0));
    Math.abs(this.lat1 - this.lat2) > y ? this.ns = Math.log(s / o) / Math.log(n / c) : this.ns = a, isNaN(this.ns) && (this.ns = a), this.f0 = s / (this.ns * Math.pow(n, this.ns)), this.rh = this.a * this.f0 * Math.pow(r, this.ns), this.title || (this.title = "Lambert Conformal Conic");
  }
}
function Wi(e) {
  var a = e.x, t = e.y;
  Math.abs(2 * Math.abs(t) - Math.PI) <= y && (t = aa(t) * (_ - 2 * y));
  var s = Math.abs(Math.abs(t) - _), n, i;
  if (s > y)
    n = ae(this.e, t, Math.sin(t)), i = this.a * this.f0 * Math.pow(n, this.ns);
  else {
    if (s = t * this.ns, s <= 0)
      return null;
    i = 0;
  }
  var d = this.ns * M(a - this.long0, this.over);
  return e.x = this.k0 * (i * Math.sin(d)) + this.x0, e.y = this.k0 * (this.rh - i * Math.cos(d)) + this.y0, e;
}
function Ji(e) {
  var a, t, s, n, i, d = (e.x - this.x0) / this.k0, o = this.rh - (e.y - this.y0) / this.k0;
  this.ns > 0 ? (a = Math.sqrt(d * d + o * o), t = 1) : (a = -Math.sqrt(d * d + o * o), t = -1);
  var c = 0;
  if (a !== 0 && (c = Math.atan2(t * d, t * o)), a !== 0 || this.ns > 0) {
    if (t = 1 / this.ns, s = Math.pow(a / (this.a * this.f0), t), n = Qe(this.e, s), n === -9999)
      return null;
  } else
    n = -_;
  return i = M(c / this.ns + this.long0, this.over), e.x = i, e.y = n, e;
}
var Qi = [
  "Lambert Tangential Conformal Conic Projection",
  "Lambert_Conformal_Conic",
  "Lambert_Conformal_Conic_1SP",
  "Lambert_Conformal_Conic_2SP",
  "lcc",
  "Lambert Conic Conformal (1SP)",
  "Lambert Conic Conformal (2SP)"
], Zi = {
  init: Yi,
  forward: Wi,
  inverse: Ji,
  names: Qi
};
function e0() {
  this.a = 6377397155e-3, this.es = 0.006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = 0.863937979737193), this.long0 || (this.long0 = 0.7417649320975901 - 0.308341501185665), this.k0 || (this.k0 = 0.9999), this.s45 = 0.785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq;
}
function a0(e) {
  var a, t, s, n, i, d, o, c = e.x, r = e.y, l = M(c - this.long0, this.over);
  return a = Math.pow((1 + this.e * Math.sin(r)) / (1 - this.e * Math.sin(r)), this.alfa * this.e / 2), t = 2 * (Math.atan(this.k * Math.pow(Math.tan(r / 2 + this.s45), this.alfa) / a) - this.s45), s = -l * this.alfa, n = Math.asin(Math.cos(this.ad) * Math.sin(t) + Math.sin(this.ad) * Math.cos(t) * Math.cos(s)), i = Math.asin(Math.cos(t) * Math.sin(s) / Math.cos(n)), d = this.n * i, o = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(n / 2 + this.s45), this.n), e.y = o * Math.cos(d) / 1, e.x = o * Math.sin(d) / 1, this.czech || (e.y *= -1, e.x *= -1), e;
}
function t0(e) {
  var a, t, s, n, i, d, o, c, r = e.x;
  e.x = e.y, e.y = r, this.czech || (e.y *= -1, e.x *= -1), d = Math.sqrt(e.x * e.x + e.y * e.y), i = Math.atan2(e.y, e.x), n = i / Math.sin(this.s0), s = 2 * (Math.atan(Math.pow(this.ro0 / d, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), a = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(n)), t = Math.asin(Math.cos(s) * Math.sin(n) / Math.cos(a)), e.x = this.long0 - t / this.alfa, o = a, c = 0;
  var l = 0;
  do
    e.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(a / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(o)) / (1 - this.e * Math.sin(o)), this.e / 2)) - this.s45), Math.abs(o - e.y) < 1e-10 && (c = 1), o = e.y, l += 1;
  while (c === 0 && l < 15);
  return l >= 15 ? null : e;
}
var s0 = ["Krovak", "Krovak Modified", "Krovak (North Orientated)", "Krovak Modified (North Orientated)", "krovak"], n0 = {
  init: e0,
  forward: a0,
  inverse: t0,
  names: s0
};
function D(e, a, t, s, n) {
  return e * n - a * Math.sin(2 * n) + t * Math.sin(4 * n) - s * Math.sin(6 * n);
}
function ta(e) {
  return 1 - 0.25 * e * (1 + e / 16 * (3 + 1.25 * e));
}
function sa(e) {
  return 0.375 * e * (1 + 0.25 * e * (1 + 0.46875 * e));
}
function na(e) {
  return 0.05859375 * e * e * (1 + 0.75 * e);
}
function ia(e) {
  return e * e * e * (35 / 3072);
}
function zt(e, a, t) {
  var s = a * t;
  return e / Math.sqrt(1 - s * s);
}
function fe(e) {
  return Math.abs(e) < _ ? e : e - aa(e) * Math.PI;
}
function Ma(e, a, t, s, n) {
  var i, d;
  i = e / a;
  for (var o = 0; o < 15; o++)
    if (d = (e - (a * i - t * Math.sin(2 * i) + s * Math.sin(4 * i) - n * Math.sin(6 * i))) / (a - 2 * t * Math.cos(2 * i) + 4 * s * Math.cos(4 * i) - 6 * n * Math.cos(6 * i)), i += d, Math.abs(d) <= 1e-10)
      return i;
  return NaN;
}
function i0() {
  this.sphere || (this.e0 = ta(this.es), this.e1 = sa(this.es), this.e2 = na(this.es), this.e3 = ia(this.es), this.ml0 = this.a * D(this.e0, this.e1, this.e2, this.e3, this.lat0));
}
function o0(e) {
  var a, t, s = e.x, n = e.y;
  if (s = M(s - this.long0, this.over), this.sphere)
    a = this.a * Math.asin(Math.cos(n) * Math.sin(s)), t = this.a * (Math.atan2(Math.tan(n), Math.cos(s)) - this.lat0);
  else {
    var i = Math.sin(n), d = Math.cos(n), o = zt(this.a, this.e, i), c = Math.tan(n) * Math.tan(n), r = s * Math.cos(n), l = r * r, f = this.es * d * d / (1 - this.es), h = this.a * D(this.e0, this.e1, this.e2, this.e3, n);
    a = o * r * (1 - l * c * (1 / 6 - (8 - c + 8 * f) * l / 120)), t = h - this.ml0 + o * i / d * l * (0.5 + (5 - c + 6 * f) * l / 24);
  }
  return e.x = a + this.x0, e.y = t + this.y0, e;
}
function d0(e) {
  e.x -= this.x0, e.y -= this.y0;
  var a = e.x / this.a, t = e.y / this.a, s, n;
  if (this.sphere) {
    var i = t + this.lat0;
    s = Math.asin(Math.sin(i) * Math.cos(a)), n = Math.atan2(Math.tan(a), Math.cos(i));
  } else {
    var d = this.ml0 / this.a + t, o = Ma(d, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(o) - _) <= y)
      return e.x = this.long0, e.y = _, t < 0 && (e.y *= -1), e;
    var c = zt(this.a, this.e, Math.sin(o)), r = c * c * c / this.a / this.a * (1 - this.es), l = Math.pow(Math.tan(o), 2), f = a * this.a / c, h = f * f;
    s = o - c * Math.tan(o) / r * f * f * (0.5 - (1 + 3 * l) * f * f / 24), n = f * (1 - h * (l / 3 + (1 + 3 * l) * l * h / 15)) / Math.cos(o);
  }
  return e.x = M(n + this.long0, this.over), e.y = fe(s), e;
}
var c0 = ["Cassini", "Cassini_Soldner", "cass"], r0 = {
  init: i0,
  forward: o0,
  inverse: d0,
  names: c0
};
function ce(e, a) {
  var t;
  return e > 1e-7 ? (t = e * a, (1 - e * e) * (a / (1 - t * t) - 0.5 / e * Math.log((1 - t) / (1 + t)))) : 2 * a;
}
var $a = 1, Ka = 2, Xa = 3, za = 4;
function h0() {
  var e = Math.abs(this.lat0);
  if (Math.abs(e - _) < y ? this.mode = this.lat0 < 0 ? $a : Ka : Math.abs(e) < y ? this.mode = Xa : this.mode = za, this.es > 0) {
    var a;
    switch (this.qp = ce(this.e, 1), this.mmf = 0.5 / (1 - this.es), this.apa = _0(this.es), this.mode) {
      case Ka:
        this.dd = 1;
        break;
      case $a:
        this.dd = 1;
        break;
      case Xa:
        this.rq = Math.sqrt(0.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = 0.5 * this.qp;
        break;
      case za:
        this.rq = Math.sqrt(0.5 * this.qp), a = Math.sin(this.lat0), this.sinb1 = ce(this.e, a) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * a * a) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
        break;
    }
  } else
    this.mode === za && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
}
function f0(e) {
  var a, t, s, n, i, d, o, c, r, l, f = e.x, h = e.y;
  if (f = M(f - this.long0, this.over), this.sphere) {
    if (i = Math.sin(h), l = Math.cos(h), s = Math.cos(f), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if (t = this.mode === this.EQUIT ? 1 + l * s : 1 + this.sinph0 * i + this.cosph0 * l * s, t <= y)
        return null;
      t = Math.sqrt(2 / t), a = t * l * Math.sin(f), t *= this.mode === this.EQUIT ? i : this.cosph0 * i - this.sinph0 * l * s;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (s = -s), Math.abs(h + this.lat0) < y)
        return null;
      t = P - h * 0.5, t = 2 * (this.mode === this.S_POLE ? Math.cos(t) : Math.sin(t)), a = t * Math.sin(f), t *= s;
    }
  } else {
    switch (o = 0, c = 0, r = 0, s = Math.cos(f), n = Math.sin(f), i = Math.sin(h), d = ce(this.e, i), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (o = d / this.qp, c = Math.sqrt(1 - o * o)), this.mode) {
      case this.OBLIQ:
        r = 1 + this.sinb1 * o + this.cosb1 * c * s;
        break;
      case this.EQUIT:
        r = 1 + c * s;
        break;
      case this.N_POLE:
        r = _ + h, d = this.qp - d;
        break;
      case this.S_POLE:
        r = h - _, d = this.qp + d;
        break;
    }
    if (Math.abs(r) < y)
      return null;
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        r = Math.sqrt(2 / r), this.mode === this.OBLIQ ? t = this.ymf * r * (this.cosb1 * o - this.sinb1 * c * s) : t = (r = Math.sqrt(2 / (1 + c * s))) * o * this.ymf, a = this.xmf * r * c * n;
        break;
      case this.N_POLE:
      case this.S_POLE:
        d >= 0 ? (a = (r = Math.sqrt(d)) * n, t = s * (this.mode === this.S_POLE ? r : -r)) : a = t = 0;
        break;
    }
  }
  return e.x = this.a * a + this.x0, e.y = this.a * t + this.y0, e;
}
function l0(e) {
  e.x -= this.x0, e.y -= this.y0;
  var a = e.x / this.a, t = e.y / this.a, s, n, i, d, o, c, r;
  if (this.sphere) {
    var l = 0, f, h = 0;
    if (f = Math.sqrt(a * a + t * t), n = f * 0.5, n > 1)
      return null;
    switch (n = 2 * Math.asin(n), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (h = Math.sin(n), l = Math.cos(n)), this.mode) {
      case this.EQUIT:
        n = Math.abs(f) <= y ? 0 : Math.asin(t * h / f), a *= h, t = l * f;
        break;
      case this.OBLIQ:
        n = Math.abs(f) <= y ? this.lat0 : Math.asin(l * this.sinph0 + t * h * this.cosph0 / f), a *= h * this.cosph0, t = (l - Math.sin(n) * this.sinph0) * f;
        break;
      case this.N_POLE:
        t = -t, n = _ - n;
        break;
      case this.S_POLE:
        n -= _;
        break;
    }
    s = t === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(a, t);
  } else {
    if (r = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if (a /= this.dd, t *= this.dd, c = Math.sqrt(a * a + t * t), c < y)
        return e.x = this.long0, e.y = this.lat0, e;
      d = 2 * Math.asin(0.5 * c / this.rq), i = Math.cos(d), a *= d = Math.sin(d), this.mode === this.OBLIQ ? (r = i * this.sinb1 + t * d * this.cosb1 / c, o = this.qp * r, t = c * this.cosb1 * i - t * this.sinb1 * d) : (r = t * d / c, o = this.qp * r, t = c * i);
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (t = -t), o = a * a + t * t, !o)
        return e.x = this.long0, e.y = this.lat0, e;
      r = 1 - o / this.qp, this.mode === this.S_POLE && (r = -r);
    }
    s = Math.atan2(a, t), n = v0(Math.asin(r), this.apa);
  }
  return e.x = M(this.long0 + s, this.over), e.y = n, e;
}
var m0 = 0.3333333333333333, u0 = 0.17222222222222222, b0 = 0.10257936507936508, w0 = 0.06388888888888888, z0 = 0.0664021164021164, p0 = 0.016415012942191543;
function _0(e) {
  var a, t = [];
  return t[0] = e * m0, a = e * e, t[0] += a * u0, t[1] = a * w0, a *= e, t[0] += a * b0, t[1] += a * z0, t[2] = a * p0, t;
}
function v0(e, a) {
  var t = e + e;
  return e + a[0] * Math.sin(t) + a[1] * Math.sin(t + t) + a[2] * Math.sin(t + t + t);
}
var g0 = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"], y0 = {
  init: h0,
  forward: f0,
  inverse: l0,
  names: g0,
  S_POLE: $a,
  N_POLE: Ka,
  EQUIT: Xa,
  OBLIQ: za
};
function he(e) {
  return Math.abs(e) > 1 && (e = e > 1 ? 1 : -1), Math.asin(e);
}
function M0() {
  Math.abs(this.lat1 + this.lat2) < y || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = ie(this.e3, this.sin_po, this.cos_po), this.qs1 = ce(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = ie(this.e3, this.sin_po, this.cos_po), this.qs2 = ce(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = ce(this.e3, this.sin_po), Math.abs(this.lat1 - this.lat2) > y ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
}
function C0(e) {
  var a = e.x, t = e.y;
  this.sin_phi = Math.sin(t), this.cos_phi = Math.cos(t);
  var s = ce(this.e3, this.sin_phi), n = this.a * Math.sqrt(this.c - this.ns0 * s) / this.ns0, i = this.ns0 * M(a - this.long0, this.over), d = n * Math.sin(i) + this.x0, o = this.rh - n * Math.cos(i) + this.y0;
  return e.x = d, e.y = o, e;
}
function B0(e) {
  var a, t, s, n, i, d;
  return e.x -= this.x0, e.y = this.rh - e.y + this.y0, this.ns0 >= 0 ? (a = Math.sqrt(e.x * e.x + e.y * e.y), s = 1) : (a = -Math.sqrt(e.x * e.x + e.y * e.y), s = -1), n = 0, a !== 0 && (n = Math.atan2(s * e.x, s * e.y)), s = a * this.ns0 / this.a, this.sphere ? d = Math.asin((this.c - s * s) / (2 * this.ns0)) : (t = (this.c - s * s) / this.ns0, d = this.phi1z(this.e3, t)), i = M(n / this.ns0 + this.long0, this.over), e.x = i, e.y = d, e;
}
function k0(e, a) {
  var t, s, n, i, d, o = he(0.5 * a);
  if (e < y)
    return o;
  for (var c = e * e, r = 1; r <= 25; r++)
    if (t = Math.sin(o), s = Math.cos(o), n = e * t, i = 1 - n * n, d = 0.5 * i * i / s * (a / (1 - c) - t / i + 0.5 / e * Math.log((1 - n) / (1 + n))), o = o + d, Math.abs(d) <= 1e-7)
      return o;
  return null;
}
var S0 = ["Albers_Conic_Equal_Area", "Albers_Equal_Area", "Albers", "aea"], E0 = {
  init: M0,
  forward: C0,
  inverse: B0,
  names: S0,
  phi1z: k0
};
function A0() {
  this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1;
}
function P0(e) {
  var a, t, s, n, i, d, o, c, r = e.x, l = e.y;
  return s = M(r - this.long0, this.over), a = Math.sin(l), t = Math.cos(l), n = Math.cos(s), d = this.sin_p14 * a + this.cos_p14 * t * n, i = 1, d > 0 || Math.abs(d) <= y ? (o = this.x0 + this.a * i * t * Math.sin(s) / d, c = this.y0 + this.a * i * (this.cos_p14 * a - this.sin_p14 * t * n) / d) : (o = this.x0 + this.infinity_dist * t * Math.sin(s), c = this.y0 + this.infinity_dist * (this.cos_p14 * a - this.sin_p14 * t * n)), e.x = o, e.y = c, e;
}
function G0(e) {
  var a, t, s, n, i, d;
  return e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, e.x /= this.k0, e.y /= this.k0, (a = Math.sqrt(e.x * e.x + e.y * e.y)) ? (n = Math.atan2(a, this.rc), t = Math.sin(n), s = Math.cos(n), d = he(s * this.sin_p14 + e.y * t * this.cos_p14 / a), i = Math.atan2(e.x * t, a * this.cos_p14 * s - e.y * this.sin_p14 * t), i = M(this.long0 + i, this.over)) : (d = this.phic0, i = 0), e.x = i, e.y = d, e;
}
var x0 = ["gnom"], U0 = {
  init: A0,
  forward: P0,
  inverse: G0,
  names: x0
};
function I0(e, a) {
  var t = 1 - (1 - e * e) / (2 * e) * Math.log((1 - e) / (1 + e));
  if (Math.abs(Math.abs(a) - t) < 1e-6)
    return a < 0 ? -1 * _ : _;
  for (var s = Math.asin(0.5 * a), n, i, d, o, c = 0; c < 30; c++)
    if (i = Math.sin(s), d = Math.cos(s), o = e * i, n = Math.pow(1 - o * o, 2) / (2 * d) * (a / (1 - e * e) - i / (1 - o * o) + 0.5 / e * Math.log((1 - o) / (1 + o))), s += n, Math.abs(n) <= 1e-10)
      return s;
  return NaN;
}
function T0() {
  this.sphere || (this.k0 = ie(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
}
function N0(e) {
  var a = e.x, t = e.y, s, n, i = M(a - this.long0, this.over);
  if (this.sphere)
    s = this.x0 + this.a * i * Math.cos(this.lat_ts), n = this.y0 + this.a * Math.sin(t) / Math.cos(this.lat_ts);
  else {
    var d = ce(this.e, Math.sin(t));
    s = this.x0 + this.a * this.k0 * i, n = this.y0 + this.a * d * 0.5 / this.k0;
  }
  return e.x = s, e.y = n, e;
}
function j0(e) {
  e.x -= this.x0, e.y -= this.y0;
  var a, t;
  return this.sphere ? (a = M(this.long0 + e.x / this.a / Math.cos(this.lat_ts), this.over), t = Math.asin(e.y / this.a * Math.cos(this.lat_ts))) : (t = I0(this.e, 2 * e.y * this.k0 / this.a), a = M(this.long0 + e.x / (this.a * this.k0), this.over)), e.x = a, e.y = t, e;
}
var R0 = ["cea"], O0 = {
  init: T0,
  forward: N0,
  inverse: j0,
  names: R0
};
function D0() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts);
}
function F0(e) {
  var a = e.x, t = e.y, s = M(a - this.long0, this.over), n = fe(t - this.lat0);
  return e.x = this.x0 + this.a * s * this.rc, e.y = this.y0 + this.a * n, e;
}
function L0(e) {
  var a = e.x, t = e.y;
  return e.x = M(this.long0 + (a - this.x0) / (this.a * this.rc), this.over), e.y = fe(this.lat0 + (t - this.y0) / this.a), e;
}
var q0 = ["Equirectangular", "Equidistant_Cylindrical", "Equidistant_Cylindrical_Spherical", "eqc"], V0 = {
  init: D0,
  forward: F0,
  inverse: L0,
  names: q0
}, Ht = 20;
function H0() {
  this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = ta(this.es), this.e1 = sa(this.es), this.e2 = na(this.es), this.e3 = ia(this.es), this.ml0 = this.a * D(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function $0(e) {
  var a = e.x, t = e.y, s, n, i, d = M(a - this.long0, this.over);
  if (i = d * Math.sin(t), this.sphere)
    Math.abs(t) <= y ? (s = this.a * d, n = -1 * this.a * this.lat0) : (s = this.a * Math.sin(i) / Math.tan(t), n = this.a * (fe(t - this.lat0) + (1 - Math.cos(i)) / Math.tan(t)));
  else if (Math.abs(t) <= y)
    s = this.a * d, n = -1 * this.ml0;
  else {
    var o = zt(this.a, this.e, Math.sin(t)) / Math.tan(t);
    s = o * Math.sin(i), n = this.a * D(this.e0, this.e1, this.e2, this.e3, t) - this.ml0 + o * (1 - Math.cos(i));
  }
  return e.x = s + this.x0, e.y = n + this.y0, e;
}
function K0(e) {
  var a, t, s, n, i, d, o, c, r;
  if (s = e.x - this.x0, n = e.y - this.y0, this.sphere)
    if (Math.abs(n + this.a * this.lat0) <= y)
      a = M(s / this.a + this.long0, this.over), t = 0;
    else {
      d = this.lat0 + n / this.a, o = s * s / this.a / this.a + d * d, c = d;
      var l;
      for (i = Ht; i; --i)
        if (l = Math.tan(c), r = -1 * (d * (c * l + 1) - c - 0.5 * (c * c + o) * l) / ((c - d) / l - 1), c += r, Math.abs(r) <= y) {
          t = c;
          break;
        }
      a = M(this.long0 + Math.asin(s * Math.tan(c) / this.a) / Math.sin(t), this.over);
    }
  else if (Math.abs(n + this.ml0) <= y)
    t = 0, a = M(this.long0 + s / this.a, this.over);
  else {
    d = (this.ml0 + n) / this.a, o = s * s / this.a / this.a + d * d, c = d;
    var f, h, u, m, b;
    for (i = Ht; i; --i)
      if (b = this.e * Math.sin(c), f = Math.sqrt(1 - b * b) * Math.tan(c), h = this.a * D(this.e0, this.e1, this.e2, this.e3, c), u = this.e0 - 2 * this.e1 * Math.cos(2 * c) + 4 * this.e2 * Math.cos(4 * c) - 6 * this.e3 * Math.cos(6 * c), m = h / this.a, r = (d * (f * m + 1) - m - 0.5 * f * (m * m + o)) / (this.es * Math.sin(2 * c) * (m * m + o - 2 * d * m) / (4 * f) + (d - m) * (f * u - 2 / Math.sin(2 * c)) - u), c -= r, Math.abs(r) <= y) {
        t = c;
        break;
      }
    f = Math.sqrt(1 - this.es * Math.pow(Math.sin(t), 2)) * Math.tan(t), a = M(this.long0 + Math.asin(s * f / this.a) / Math.sin(t), this.over);
  }
  return e.x = a, e.y = t, e;
}
var X0 = ["Polyconic", "American_Polyconic", "poly"], Y0 = {
  init: H0,
  forward: $0,
  inverse: K0,
  names: X0
};
function W0() {
  this.A = [], this.A[1] = 0.6399175073, this.A[2] = -0.1358797613, this.A[3] = 0.063294409, this.A[4] = -0.02526853, this.A[5] = 0.0117879, this.A[6] = -55161e-7, this.A[7] = 26906e-7, this.A[8] = -1333e-6, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = 0.7557853228, this.B_im[1] = 0, this.B_re[2] = 0.249204646, this.B_im[2] = 3371507e-9, this.B_re[3] = -1541739e-9, this.B_im[3] = 0.04105856, this.B_re[4] = -0.10162907, this.B_im[4] = 0.01727609, this.B_re[5] = -0.26623489, this.B_im[5] = -0.36249218, this.B_re[6] = -0.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -0.577245789, this.C_im[2] = -7809598e-9, this.C_re[3] = 0.508307513, this.C_im[3] = -0.112208952, this.C_re[4] = -0.15094762, this.C_im[4] = 0.18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = 0.5185406398, this.D[3] = -0.03333098, this.D[4] = -0.1052906, this.D[5] = -0.0368594, this.D[6] = 7317e-6, this.D[7] = 0.0122, this.D[8] = 394e-5, this.D[9] = -13e-4;
}
function J0(e) {
  var a, t = e.x, s = e.y, n = s - this.lat0, i = t - this.long0, d = n / Fe * 1e-5, o = i, c = 1, r = 0;
  for (a = 1; a <= 10; a++)
    c = c * d, r = r + this.A[a] * c;
  var l = r, f = o, h = 1, u = 0, m, b, w = 0, p = 0;
  for (a = 1; a <= 6; a++)
    m = h * l - u * f, b = u * l + h * f, h = m, u = b, w = w + this.B_re[a] * h - this.B_im[a] * u, p = p + this.B_im[a] * h + this.B_re[a] * u;
  return e.x = p * this.a + this.x0, e.y = w * this.a + this.y0, e;
}
function Q0(e) {
  var a, t = e.x, s = e.y, n = t - this.x0, i = s - this.y0, d = i / this.a, o = n / this.a, c = 1, r = 0, l, f, h = 0, u = 0;
  for (a = 1; a <= 6; a++)
    l = c * d - r * o, f = r * d + c * o, c = l, r = f, h = h + this.C_re[a] * c - this.C_im[a] * r, u = u + this.C_im[a] * c + this.C_re[a] * r;
  for (var m = 0; m < this.iterations; m++) {
    var b = h, w = u, p, v, C = d, k = o;
    for (a = 2; a <= 6; a++)
      p = b * h - w * u, v = w * h + b * u, b = p, w = v, C = C + (a - 1) * (this.B_re[a] * b - this.B_im[a] * w), k = k + (a - 1) * (this.B_im[a] * b + this.B_re[a] * w);
    b = 1, w = 0;
    var g = this.B_re[1], B = this.B_im[1];
    for (a = 2; a <= 6; a++)
      p = b * h - w * u, v = w * h + b * u, b = p, w = v, g = g + a * (this.B_re[a] * b - this.B_im[a] * w), B = B + a * (this.B_im[a] * b + this.B_re[a] * w);
    var S = g * g + B * B;
    h = (C * g + k * B) / S, u = (k * g - C * B) / S;
  }
  var A = h, E = u, T = 1, N = 0;
  for (a = 1; a <= 9; a++)
    T = T * A, N = N + this.D[a] * T;
  var Z = this.lat0 + N * Fe * 1e5, ee = this.long0 + E;
  return e.x = ee, e.y = Z, e;
}
var Z0 = ["New_Zealand_Map_Grid", "nzmg"], eo = {
  init: W0,
  forward: J0,
  inverse: Q0,
  names: Z0
};
function ao() {
}
function to(e) {
  var a = e.x, t = e.y, s = M(a - this.long0, this.over), n = this.x0 + this.a * s, i = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + t / 2.5)) * 1.25;
  return e.x = n, e.y = i, e;
}
function so(e) {
  e.x -= this.x0, e.y -= this.y0;
  var a = M(this.long0 + e.x / this.a, this.over), t = 2.5 * (Math.atan(Math.exp(0.8 * e.y / this.a)) - Math.PI / 4);
  return e.x = a, e.y = t, e;
}
var no = ["Miller_Cylindrical", "mill"], io = {
  init: ao,
  forward: to,
  inverse: so,
  names: no
}, oo = 20;
function co() {
  this.long0 = this.long0 || 0, this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = ft(this.es);
}
function ro(e) {
  var a, t, s = e.x, n = e.y;
  if (s = M(s - this.long0, this.over), this.sphere) {
    if (!this.m)
      n = this.n !== 1 ? Math.asin(this.n * Math.sin(n)) : n;
    else
      for (var i = this.n * Math.sin(n), d = oo; d; --d) {
        var o = (this.m * n + Math.sin(n) - i) / (this.m + Math.cos(n));
        if (n -= o, Math.abs(o) < y)
          break;
      }
    a = this.a * this.C_x * s * (this.m + Math.cos(n)), t = this.a * this.C_y * n;
  } else {
    var c = Math.sin(n), r = Math.cos(n);
    t = this.a * Pe(n, c, r, this.en), a = this.a * s * r / Math.sqrt(1 - this.es * c * c);
  }
  return e.x = a, e.y = t, e;
}
function ho(e) {
  var a, t, s, n;
  return e.x -= this.x0, s = e.x / this.a, e.y -= this.y0, a = e.y / this.a, this.sphere ? (a /= this.C_y, s = s / (this.C_x * (this.m + Math.cos(a))), this.m ? a = he((this.m * a + Math.sin(a)) / this.n) : this.n !== 1 && (a = he(Math.sin(a) / this.n)), s = M(s + this.long0, this.over), a = fe(a)) : (a = lt(e.y / this.a, this.es, this.en), n = Math.abs(a), n < _ ? (n = Math.sin(a), t = this.long0 + e.x * Math.sqrt(1 - this.es * n * n) / (this.a * Math.cos(a)), s = M(t, this.over)) : n - y < _ && (s = this.long0)), e.x = s, e.y = a, e;
}
var fo = ["Sinusoidal", "sinu"], lo = {
  init: co,
  forward: ro,
  inverse: ho,
  names: fo
};
function mo() {
  this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0;
}
function uo(e) {
  for (var a = e.x, t = e.y, s = M(a - this.long0, this.over), n = t, i = Math.PI * Math.sin(t); ; ) {
    var d = -(n + Math.sin(n) - i) / (1 + Math.cos(n));
    if (n += d, Math.abs(d) < y)
      break;
  }
  n /= 2, Math.PI / 2 - Math.abs(t) < y && (s = 0);
  var o = 0.900316316158 * this.a * s * Math.cos(n) + this.x0, c = 1.4142135623731 * this.a * Math.sin(n) + this.y0;
  return e.x = o, e.y = c, e;
}
function bo(e) {
  var a, t;
  e.x -= this.x0, e.y -= this.y0, t = e.y / (1.4142135623731 * this.a), Math.abs(t) > 0.999999999999 && (t = 0.999999999999), a = Math.asin(t);
  var s = M(this.long0 + e.x / (0.900316316158 * this.a * Math.cos(a)), this.over);
  s < -Math.PI && (s = -Math.PI), s > Math.PI && (s = Math.PI), t = (2 * a + Math.sin(2 * a)) / Math.PI, Math.abs(t) > 1 && (t = 1);
  var n = Math.asin(t);
  return e.x = s, e.y = n, e;
}
var wo = ["Mollweide", "moll"], zo = {
  init: mo,
  forward: uo,
  inverse: bo,
  names: wo
};
function po() {
  Math.abs(this.lat1 + this.lat2) < y || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = ta(this.es), this.e1 = sa(this.es), this.e2 = na(this.es), this.e3 = ia(this.es), this.sin_phi = Math.sin(this.lat1), this.cos_phi = Math.cos(this.lat1), this.ms1 = ie(this.e, this.sin_phi, this.cos_phi), this.ml1 = D(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < y ? this.ns = this.sin_phi : (this.sin_phi = Math.sin(this.lat2), this.cos_phi = Math.cos(this.lat2), this.ms2 = ie(this.e, this.sin_phi, this.cos_phi), this.ml2 = D(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = D(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0));
}
function _o(e) {
  var a = e.x, t = e.y, s;
  if (this.sphere)
    s = this.a * (this.g - t);
  else {
    var n = D(this.e0, this.e1, this.e2, this.e3, t);
    s = this.a * (this.g - n);
  }
  var i = this.ns * M(a - this.long0, this.over), d = this.x0 + s * Math.sin(i), o = this.y0 + this.rh - s * Math.cos(i);
  return e.x = d, e.y = o, e;
}
function vo(e) {
  e.x -= this.x0, e.y = this.rh - e.y + this.y0;
  var a, t, s, n;
  this.ns >= 0 ? (t = Math.sqrt(e.x * e.x + e.y * e.y), a = 1) : (t = -Math.sqrt(e.x * e.x + e.y * e.y), a = -1);
  var i = 0;
  if (t !== 0 && (i = Math.atan2(a * e.x, a * e.y)), this.sphere)
    return n = M(this.long0 + i / this.ns, this.over), s = fe(this.g - t / this.a), e.x = n, e.y = s, e;
  var d = this.g - t / this.a;
  return s = Ma(d, this.e0, this.e1, this.e2, this.e3), n = M(this.long0 + i / this.ns, this.over), e.x = n, e.y = s, e;
}
var go = ["Equidistant_Conic", "eqdc"], yo = {
  init: po,
  forward: _o,
  inverse: vo,
  names: go
};
function Mo() {
  this.R = this.a;
}
function Co(e) {
  var a = e.x, t = e.y, s = M(a - this.long0, this.over), n, i;
  Math.abs(t) <= y && (n = this.x0 + this.R * s, i = this.y0);
  var d = he(2 * Math.abs(t / Math.PI));
  (Math.abs(s) <= y || Math.abs(Math.abs(t) - _) <= y) && (n = this.x0, t >= 0 ? i = this.y0 + Math.PI * this.R * Math.tan(0.5 * d) : i = this.y0 + Math.PI * this.R * -Math.tan(0.5 * d));
  var o = 0.5 * Math.abs(Math.PI / s - s / Math.PI), c = o * o, r = Math.sin(d), l = Math.cos(d), f = l / (r + l - 1), h = f * f, u = f * (2 / r - 1), m = u * u, b = Math.PI * this.R * (o * (f - m) + Math.sqrt(c * (f - m) * (f - m) - (m + c) * (h - m))) / (m + c);
  s < 0 && (b = -b), n = this.x0 + b;
  var w = c + f;
  return b = Math.PI * this.R * (u * w - o * Math.sqrt((m + c) * (c + 1) - w * w)) / (m + c), t >= 0 ? i = this.y0 + b : i = this.y0 - b, e.x = n, e.y = i, e;
}
function Bo(e) {
  var a, t, s, n, i, d, o, c, r, l, f, h, u;
  return e.x -= this.x0, e.y -= this.y0, f = Math.PI * this.R, s = e.x / f, n = e.y / f, i = s * s + n * n, d = -Math.abs(n) * (1 + i), o = d - 2 * n * n + s * s, c = -2 * d + 1 + 2 * n * n + i * i, u = n * n / c + (2 * o * o * o / c / c / c - 9 * d * o / c / c) / 27, r = (d - o * o / 3 / c) / c, l = 2 * Math.sqrt(-r / 3), f = 3 * u / r / l, Math.abs(f) > 1 && (f >= 0 ? f = 1 : f = -1), h = Math.acos(f) / 3, e.y >= 0 ? t = (-l * Math.cos(h + Math.PI / 3) - o / 3 / c) * Math.PI : t = -(-l * Math.cos(h + Math.PI / 3) - o / 3 / c) * Math.PI, Math.abs(s) < y ? a = this.long0 : a = M(this.long0 + Math.PI * (i - 1 + Math.sqrt(1 + 2 * (s * s - n * n) + i * i)) / 2 / s, this.over), e.x = a, e.y = t, e;
}
var ko = ["Van_der_Grinten_I", "VanDerGrinten", "Van_der_Grinten", "vandg"], So = {
  init: Mo,
  forward: Co,
  inverse: Bo,
  names: ko
};
function Eo(e, a, t, s, n, i) {
  const d = s - a, o = Math.atan((1 - i) * Math.tan(e)), c = Math.atan((1 - i) * Math.tan(t)), r = Math.sin(o), l = Math.cos(o), f = Math.sin(c), h = Math.cos(c);
  let u = d, m, b = 100, w, p, v, C, k, g, B, S, A, E, T, N, Z, ee;
  do {
    if (w = Math.sin(u), p = Math.cos(u), v = Math.sqrt(
      h * w * (h * w) + (l * f - r * h * p) * (l * f - r * h * p)
    ), v === 0)
      return { azi1: 0, s12: 0 };
    C = r * f + l * h * p, k = Math.atan2(v, C), g = l * h * w / v, B = 1 - g * g, S = B !== 0 ? C - 2 * r * f / B : 0, A = i / 16 * B * (4 + i * (4 - 3 * B)), m = u, u = d + (1 - A) * i * g * (k + A * v * (S + A * C * (-1 + 2 * S * S)));
  } while (Math.abs(u - m) > 1e-12 && --b > 0);
  return b === 0 ? { azi1: NaN, s12: NaN } : (E = B * (n * n - n * (1 - i) * (n * (1 - i))) / (n * (1 - i) * (n * (1 - i))), T = 1 + E / 16384 * (4096 + E * (-768 + E * (320 - 175 * E))), N = E / 1024 * (256 + E * (-128 + E * (74 - 47 * E))), Z = N * v * (S + N / 4 * (C * (-1 + 2 * S * S) - N / 6 * S * (-3 + 4 * v * v) * (-3 + 4 * S * S))), ee = n * (1 - i) * T * (k - Z), { azi1: Math.atan2(h * w, l * f - r * h * p), s12: ee });
}
function Ao(e, a, t, s, n, i) {
  const d = Math.atan((1 - i) * Math.tan(e)), o = Math.sin(d), c = Math.cos(d), r = Math.sin(t), l = Math.cos(t), f = Math.atan2(o, c * l), h = c * r, u = 1 - h * h, m = u * (n * n - n * (1 - i) * (n * (1 - i))) / (n * (1 - i) * (n * (1 - i))), b = 1 + m / 16384 * (4096 + m * (-768 + m * (320 - 175 * m))), w = m / 1024 * (256 + m * (-128 + m * (74 - 47 * m)));
  let p = s / (n * (1 - i) * b), v, C = 100, k, g, B, S;
  do
    k = Math.cos(2 * f + p), g = Math.sin(p), B = Math.cos(p), S = w * g * (k + w / 4 * (B * (-1 + 2 * k * k) - w / 6 * k * (-3 + 4 * g * g) * (-3 + 4 * k * k))), v = p, p = s / (n * (1 - i) * b) + S;
  while (Math.abs(p - v) > 1e-12 && --C > 0);
  if (C === 0)
    return { lat2: NaN, lon2: NaN };
  const A = o * g - c * B * l, E = Math.atan2(
    o * B + c * g * l,
    (1 - i) * Math.sqrt(h * h + A * A)
  ), T = Math.atan2(
    g * r,
    c * B - o * g * l
  ), N = i / 16 * u * (4 + i * (4 - 3 * u)), Z = T - (1 - N) * i * h * (p + N * g * (k + N * B * (-1 + 2 * k * k))), ee = a + Z;
  return { lat2: E, lon2: ee };
}
function Po() {
  this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0), this.f = this.es / (1 + Math.sqrt(1 - this.es));
}
function Go(e) {
  var a = e.x, t = e.y, s = Math.sin(e.y), n = Math.cos(e.y), i = M(a - this.long0, this.over), d, o, c, r, l, f, h, u, m, b, w;
  return this.sphere ? Math.abs(this.sin_p12 - 1) <= y ? (e.x = this.x0 + this.a * (_ - t) * Math.sin(i), e.y = this.y0 - this.a * (_ - t) * Math.cos(i), e) : Math.abs(this.sin_p12 + 1) <= y ? (e.x = this.x0 + this.a * (_ + t) * Math.sin(i), e.y = this.y0 + this.a * (_ + t) * Math.cos(i), e) : (m = this.sin_p12 * s + this.cos_p12 * n * Math.cos(i), h = Math.acos(m), u = h ? h / Math.sin(h) : 1, e.x = this.x0 + this.a * u * n * Math.sin(i), e.y = this.y0 + this.a * u * (this.cos_p12 * s - this.sin_p12 * n * Math.cos(i)), e) : (d = ta(this.es), o = sa(this.es), c = na(this.es), r = ia(this.es), Math.abs(this.sin_p12 - 1) <= y ? (l = this.a * D(d, o, c, r, _), f = this.a * D(d, o, c, r, t), e.x = this.x0 + (l - f) * Math.sin(i), e.y = this.y0 - (l - f) * Math.cos(i), e) : Math.abs(this.sin_p12 + 1) <= y ? (l = this.a * D(d, o, c, r, _), f = this.a * D(d, o, c, r, t), e.x = this.x0 + (l + f) * Math.sin(i), e.y = this.y0 + (l + f) * Math.cos(i), e) : Math.abs(a) < y && Math.abs(t - this.lat0) < y ? (e.x = e.y = 0, e) : (b = Eo(this.lat0, this.long0, t, a, this.a, this.f), w = b.azi1, e.x = b.s12 * Math.sin(w), e.y = b.s12 * Math.cos(w), e));
}
function xo(e) {
  e.x -= this.x0, e.y -= this.y0;
  var a, t, s, n, i, d, o, c, r, l, f, h, u, m, b, w;
  return this.sphere ? (a = Math.sqrt(e.x * e.x + e.y * e.y), a > 2 * _ * this.a ? void 0 : (t = a / this.a, s = Math.sin(t), n = Math.cos(t), i = this.long0, Math.abs(a) <= y ? d = this.lat0 : (d = he(n * this.sin_p12 + e.y * s * this.cos_p12 / a), o = Math.abs(this.lat0) - _, Math.abs(o) <= y ? this.lat0 >= 0 ? i = M(this.long0 + Math.atan2(e.x, -e.y), this.over) : i = M(this.long0 - Math.atan2(-e.x, e.y), this.over) : i = M(this.long0 + Math.atan2(e.x * s, a * this.cos_p12 * n - e.y * this.sin_p12 * s), this.over)), e.x = i, e.y = d, e)) : (c = ta(this.es), r = sa(this.es), l = na(this.es), f = ia(this.es), Math.abs(this.sin_p12 - 1) <= y ? (h = this.a * D(c, r, l, f, _), a = Math.sqrt(e.x * e.x + e.y * e.y), u = h - a, d = Ma(u / this.a, c, r, l, f), i = M(this.long0 + Math.atan2(e.x, -1 * e.y), this.over), e.x = i, e.y = d, e) : Math.abs(this.sin_p12 + 1) <= y ? (h = this.a * D(c, r, l, f, _), a = Math.sqrt(e.x * e.x + e.y * e.y), u = a - h, d = Ma(u / this.a, c, r, l, f), i = M(this.long0 + Math.atan2(e.x, e.y), this.over), e.x = i, e.y = d, e) : (m = Math.atan2(e.x, e.y), b = Math.sqrt(e.x * e.x + e.y * e.y), w = Ao(this.lat0, this.long0, m, b, this.a, this.f), e.x = w.lon2, e.y = w.lat2, e));
}
var Uo = ["Azimuthal_Equidistant", "aeqd"], Io = {
  init: Po,
  forward: Go,
  inverse: xo,
  names: Uo
};
function To() {
  this.sin_p14 = Math.sin(this.lat0 || 0), this.cos_p14 = Math.cos(this.lat0 || 0);
}
function No(e) {
  var a, t, s, n, i, d, o, c, r = e.x, l = e.y;
  return s = M(r - (this.long0 || 0), this.over), a = Math.sin(l), t = Math.cos(l), n = Math.cos(s), d = this.sin_p14 * a + this.cos_p14 * t * n, i = 1, (d > 0 || Math.abs(d) <= y) && (o = this.a * i * t * Math.sin(s), c = (this.y0 || 0) + this.a * i * (this.cos_p14 * a - this.sin_p14 * t * n)), e.x = o, e.y = c, e;
}
function jo(e) {
  var a, t, s, n, i, d, o, c, r;
  return e.x -= this.x0 || 0, e.y -= this.y0 || 0, a = Math.sqrt(e.x * e.x + e.y * e.y), t = he(a / this.a), s = Math.sin(t), n = Math.cos(t), c = this.long0 || 0, r = this.lat0 || 0, d = c, Math.abs(a) <= y ? (o = r, e.x = d, e.y = o, e) : (o = he(n * this.sin_p14 + e.y * s * this.cos_p14 / a), i = Math.abs(r) - _, Math.abs(i) <= y ? (r >= 0 ? d = M(c + Math.atan2(e.x, -e.y), this.over) : d = M(c - Math.atan2(-e.x, e.y), this.over), e.x = d, e.y = o, e) : (d = M(c + Math.atan2(e.x * s, a * this.cos_p14 * n - e.y * this.sin_p14 * s), this.over), e.x = d, e.y = o, e));
}
var Ro = ["ortho"], Oo = {
  init: To,
  forward: No,
  inverse: jo,
  names: Ro
}, x = {
  FRONT: 1,
  RIGHT: 2,
  BACK: 3,
  LEFT: 4,
  TOP: 5,
  BOTTOM: 6
}, G = {
  AREA_0: 1,
  AREA_1: 2,
  AREA_2: 3,
  AREA_3: 4
};
function Do() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= _ - P / 2 ? this.face = x.TOP : this.lat0 <= -(_ - P / 2) ? this.face = x.BOTTOM : Math.abs(this.long0) <= P ? this.face = x.FRONT : Math.abs(this.long0) <= _ + P ? this.face = this.long0 > 0 ? x.RIGHT : x.LEFT : this.face = x.BACK, this.es !== 0 && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f);
}
function Fo(e) {
  var a = { x: 0, y: 0 }, t, s, n, i, d, o, c = { value: 0 };
  if (e.x -= this.long0, this.es !== 0 ? t = Math.atan(this.one_minus_f_squared * Math.tan(e.y)) : t = e.y, s = e.x, this.face === x.TOP)
    i = _ - t, s >= P && s <= _ + P ? (c.value = G.AREA_0, n = s - _) : s > _ + P || s <= -(_ + P) ? (c.value = G.AREA_1, n = s > 0 ? s - I : s + I) : s > -(_ + P) && s <= -P ? (c.value = G.AREA_2, n = s + _) : (c.value = G.AREA_3, n = s);
  else if (this.face === x.BOTTOM)
    i = _ + t, s >= P && s <= _ + P ? (c.value = G.AREA_0, n = -s + _) : s < P && s >= -P ? (c.value = G.AREA_1, n = -s) : s < -P && s >= -(_ + P) ? (c.value = G.AREA_2, n = -s - _) : (c.value = G.AREA_3, n = s > 0 ? -s + I : -s - I);
  else {
    var r, l, f, h, u, m, b;
    this.face === x.RIGHT ? s = ke(s, +_) : this.face === x.BACK ? s = ke(s, +I) : this.face === x.LEFT && (s = ke(s, -_)), h = Math.sin(t), u = Math.cos(t), m = Math.sin(s), b = Math.cos(s), r = u * b, l = u * m, f = h, this.face === x.FRONT ? (i = Math.acos(r), n = la(i, f, l, c)) : this.face === x.RIGHT ? (i = Math.acos(l), n = la(i, f, -r, c)) : this.face === x.BACK ? (i = Math.acos(-r), n = la(i, f, -l, c)) : this.face === x.LEFT ? (i = Math.acos(-l), n = la(i, f, r, c)) : (i = n = 0, c.value = G.AREA_0);
  }
  return o = Math.atan(12 / I * (n + Math.acos(Math.sin(n) * Math.cos(P)) - _)), d = Math.sqrt((1 - Math.cos(i)) / (Math.cos(o) * Math.cos(o)) / (1 - Math.cos(Math.atan(1 / Math.cos(n))))), c.value === G.AREA_1 ? o += _ : c.value === G.AREA_2 ? o += I : c.value === G.AREA_3 && (o += 1.5 * I), a.x = d * Math.cos(o), a.y = d * Math.sin(o), a.x = a.x * this.a + this.x0, a.y = a.y * this.a + this.y0, e.x = a.x, e.y = a.y, e;
}
function Lo(e) {
  var a = { lam: 0, phi: 0 }, t, s, n, i, d, o, c, r, l, f = { value: 0 };
  if (e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, s = Math.atan(Math.sqrt(e.x * e.x + e.y * e.y)), t = Math.atan2(e.y, e.x), e.x >= 0 && e.x >= Math.abs(e.y) ? f.value = G.AREA_0 : e.y >= 0 && e.y >= Math.abs(e.x) ? (f.value = G.AREA_1, t -= _) : e.x < 0 && -e.x >= Math.abs(e.y) ? (f.value = G.AREA_2, t = t < 0 ? t + I : t - I) : (f.value = G.AREA_3, t += _), l = I / 12 * Math.tan(t), d = Math.sin(l) / (Math.cos(l) - 1 / Math.sqrt(2)), o = Math.atan(d), n = Math.cos(t), i = Math.tan(s), c = 1 - n * n * i * i * (1 - Math.cos(Math.atan(1 / Math.cos(o)))), c < -1 ? c = -1 : c > 1 && (c = 1), this.face === x.TOP)
    r = Math.acos(c), a.phi = _ - r, f.value === G.AREA_0 ? a.lam = o + _ : f.value === G.AREA_1 ? a.lam = o < 0 ? o + I : o - I : f.value === G.AREA_2 ? a.lam = o - _ : a.lam = o;
  else if (this.face === x.BOTTOM)
    r = Math.acos(c), a.phi = r - _, f.value === G.AREA_0 ? a.lam = -o + _ : f.value === G.AREA_1 ? a.lam = -o : f.value === G.AREA_2 ? a.lam = -o - _ : a.lam = o < 0 ? -o - I : -o + I;
  else {
    var h, u, m;
    h = c, l = h * h, l >= 1 ? m = 0 : m = Math.sqrt(1 - l) * Math.sin(o), l += m * m, l >= 1 ? u = 0 : u = Math.sqrt(1 - l), f.value === G.AREA_1 ? (l = u, u = -m, m = l) : f.value === G.AREA_2 ? (u = -u, m = -m) : f.value === G.AREA_3 && (l = u, u = m, m = -l), this.face === x.RIGHT ? (l = h, h = -u, u = l) : this.face === x.BACK ? (h = -h, u = -u) : this.face === x.LEFT && (l = h, h = u, u = -l), a.phi = Math.acos(-m) - _, a.lam = Math.atan2(u, h), this.face === x.RIGHT ? a.lam = ke(a.lam, -_) : this.face === x.BACK ? a.lam = ke(a.lam, -I) : this.face === x.LEFT && (a.lam = ke(a.lam, +_));
  }
  if (this.es !== 0) {
    var b, w, p;
    b = a.phi < 0 ? 1 : 0, w = Math.tan(a.phi), p = this.b / Math.sqrt(w * w + this.one_minus_f_squared), a.phi = Math.atan(Math.sqrt(this.a * this.a - p * p) / (this.one_minus_f * p)), b && (a.phi = -a.phi);
  }
  return a.lam += this.long0, e.x = a.lam, e.y = a.phi, e;
}
function la(e, a, t, s) {
  var n;
  return e < y ? (s.value = G.AREA_0, n = 0) : (n = Math.atan2(a, t), Math.abs(n) <= P ? s.value = G.AREA_0 : n > P && n <= _ + P ? (s.value = G.AREA_1, n -= _) : n > _ + P || n <= -(_ + P) ? (s.value = G.AREA_2, n = n >= 0 ? n - I : n + I) : (s.value = G.AREA_3, n += _)), n;
}
function ke(e, a) {
  var t = e + a;
  return t < -I ? t += We : t > +I && (t -= We), t;
}
var qo = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"], Vo = {
  init: Do,
  forward: Fo,
  inverse: Lo,
  names: qo
}, Ya = [
  [1, 22199e-21, -715515e-10, 31103e-10],
  [0.9986, -482243e-9, -24897e-9, -13309e-10],
  [0.9954, -83103e-8, -448605e-10, -986701e-12],
  [0.99, -135364e-8, -59661e-9, 36777e-10],
  [0.9822, -167442e-8, -449547e-11, -572411e-11],
  [0.973, -214868e-8, -903571e-10, 18736e-12],
  [0.96, -305085e-8, -900761e-10, 164917e-11],
  [0.9427, -382792e-8, -653386e-10, -26154e-10],
  [0.9216, -467746e-8, -10457e-8, 481243e-11],
  [0.8962, -536223e-8, -323831e-10, -543432e-11],
  [0.8679, -609363e-8, -113898e-9, 332484e-11],
  [0.835, -698325e-8, -640253e-10, 934959e-12],
  [0.7986, -755338e-8, -500009e-10, 935324e-12],
  [0.7597, -798324e-8, -35971e-9, -227626e-11],
  [0.7186, -851367e-8, -701149e-10, -86303e-10],
  [0.6732, -986209e-8, -199569e-9, 191974e-10],
  [0.6213, -0.010418, 883923e-10, 624051e-11],
  [0.5722, -906601e-8, 182e-6, 624051e-11],
  [0.5322, -677797e-8, 275608e-9, 624051e-11]
], De = [
  [-520417e-23, 0.0124, 121431e-23, -845284e-16],
  [0.062, 0.0124, -126793e-14, 422642e-15],
  [0.124, 0.0124, 507171e-14, -160604e-14],
  [0.186, 0.0123999, -190189e-13, 600152e-14],
  [0.248, 0.0124002, 710039e-13, -224e-10],
  [0.31, 0.0123992, -264997e-12, 835986e-13],
  [0.372, 0.0124029, 988983e-12, -311994e-12],
  [0.434, 0.0123893, -369093e-11, -435621e-12],
  [0.4958, 0.0123198, -102252e-10, -345523e-12],
  [0.5571, 0.0121916, -154081e-10, -582288e-12],
  [0.6176, 0.0119938, -241424e-10, -525327e-12],
  [0.6769, 0.011713, -320223e-10, -516405e-12],
  [0.7346, 0.0113541, -397684e-10, -609052e-12],
  [0.7903, 0.0109107, -489042e-10, -104739e-11],
  [0.8435, 0.0103431, -64615e-9, -140374e-14],
  [0.8936, 969686e-8, -64636e-9, -8547e-9],
  [0.9394, 840947e-8, -192841e-9, -42106e-10],
  [0.9761, 616527e-8, -256e-6, -42106e-10],
  [1, 328947e-8, -319159e-9, -42106e-10]
], xs = 0.8487, Us = 1.3523, Is = $ / 5, Ho = 1 / Is, Me = 18, Ca = function(e, a) {
  return e[0] + a * (e[1] + a * (e[2] + a * e[3]));
}, $o = function(e, a) {
  return e[1] + a * (2 * e[2] + a * 3 * e[3]);
};
function Ko(e, a, t, s) {
  for (var n = a; s; --s) {
    var i = e(n);
    if (n -= i, Math.abs(i) < t)
      break;
  }
  return n;
}
function Xo() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.es = 0, this.title = this.title || "Robinson";
}
function Yo(e) {
  var a = M(e.x - this.long0, this.over), t = Math.abs(e.y), s = Math.floor(t * Is);
  s < 0 ? s = 0 : s >= Me && (s = Me - 1), t = $ * (t - Ho * s);
  var n = {
    x: Ca(Ya[s], t) * a,
    y: Ca(De[s], t)
  };
  return e.y < 0 && (n.y = -n.y), n.x = n.x * this.a * xs + this.x0, n.y = n.y * this.a * Us + this.y0, n;
}
function Wo(e) {
  var a = {
    x: (e.x - this.x0) / (this.a * xs),
    y: Math.abs(e.y - this.y0) / (this.a * Us)
  };
  if (a.y >= 1)
    a.x /= Ya[Me][0], a.y = e.y < 0 ? -_ : _;
  else {
    var t = Math.floor(a.y * Me);
    for (t < 0 ? t = 0 : t >= Me && (t = Me - 1); ; )
      if (De[t][0] > a.y)
        --t;
      else if (De[t + 1][0] <= a.y)
        ++t;
      else
        break;
    var s = De[t], n = 5 * (a.y - s[0]) / (De[t + 1][0] - s[0]);
    n = Ko(function(i) {
      return (Ca(s, i) - a.y) / $o(s, i);
    }, n, y, 100), a.x /= Ca(Ya[t], n), a.y = (5 * t + n) * U, e.y < 0 && (a.y = -a.y);
  }
  return a.x = M(a.x + this.long0, this.over), a;
}
var Jo = ["Robinson", "robin"], Qo = {
  init: Xo,
  forward: Yo,
  inverse: Wo,
  names: Jo
};
function Zo() {
  this.name = "geocent";
}
function e3(e) {
  var a = gs(e, this.es, this.a);
  return a;
}
function a3(e) {
  var a = ys(e, this.es, this.a, this.b);
  return a;
}
var t3 = ["Geocentric", "geocentric", "geocent", "Geocent"], s3 = {
  init: Zo,
  forward: e3,
  inverse: a3,
  names: t3
}, O = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
}, Te = {
  h: { def: 1e5, num: !0 },
  // default is Karman line, no default in PROJ.7
  azi: { def: 0, num: !0, degrees: !0 },
  // default is North
  tilt: { def: 0, num: !0, degrees: !0 },
  // default is Nadir
  long0: { def: 0, num: !0 },
  // default is Greenwich, conversion to rad is automatic
  lat0: { def: 0, num: !0 }
  // default is Equator, conversion to rad is automatic
};
function n3() {
  if (Object.keys(Te).forEach(function(t) {
    if (typeof this[t] > "u")
      this[t] = Te[t].def;
    else {
      if (Te[t].num && isNaN(this[t]))
        throw new Error("Invalid parameter value, must be numeric " + t + " = " + this[t]);
      Te[t].num && (this[t] = parseFloat(this[t]));
    }
    Te[t].degrees && (this[t] = this[t] * U);
  }.bind(this)), Math.abs(Math.abs(this.lat0) - _) < y ? this.mode = this.lat0 < 0 ? O.S_POLE : O.N_POLE : Math.abs(this.lat0) < y ? this.mode = O.EQUIT : (this.mode = O.OBLIQ, this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0)), this.pn1 = this.h / this.a, this.pn1 <= 0 || this.pn1 > 1e10)
    throw new Error("Invalid height");
  this.p = 1 + this.pn1, this.rp = 1 / this.p, this.h1 = 1 / this.pn1, this.pfact = (this.p + 1) * this.h1, this.es = 0;
  var e = this.tilt, a = this.azi;
  this.cg = Math.cos(a), this.sg = Math.sin(a), this.cw = Math.cos(e), this.sw = Math.sin(e);
}
function i3(e) {
  e.x -= this.long0;
  var a = Math.sin(e.y), t = Math.cos(e.y), s = Math.cos(e.x), n, i;
  switch (this.mode) {
    case O.OBLIQ:
      i = this.sinph0 * a + this.cosph0 * t * s;
      break;
    case O.EQUIT:
      i = t * s;
      break;
    case O.S_POLE:
      i = -a;
      break;
    case O.N_POLE:
      i = a;
      break;
  }
  switch (i = this.pn1 / (this.p - i), n = i * t * Math.sin(e.x), this.mode) {
    case O.OBLIQ:
      i *= this.cosph0 * a - this.sinph0 * t * s;
      break;
    case O.EQUIT:
      i *= a;
      break;
    case O.N_POLE:
      i *= -(t * s);
      break;
    case O.S_POLE:
      i *= t * s;
      break;
  }
  var d, o;
  return d = i * this.cg + n * this.sg, o = 1 / (d * this.sw * this.h1 + this.cw), n = (n * this.cg - i * this.sg) * this.cw * o, i = d * o, e.x = n * this.a, e.y = i * this.a, e;
}
function o3(e) {
  e.x /= this.a, e.y /= this.a;
  var a = { x: e.x, y: e.y }, t, s, n;
  n = 1 / (this.pn1 - e.y * this.sw), t = this.pn1 * e.x * n, s = this.pn1 * e.y * this.cw * n, e.x = t * this.cg + s * this.sg, e.y = s * this.cg - t * this.sg;
  var i = V(e.x, e.y);
  if (Math.abs(i) < y)
    a.x = 0, a.y = e.y;
  else {
    var d, o;
    switch (o = 1 - i * i * this.pfact, o = (this.p - Math.sqrt(o)) / (this.pn1 / i + i / this.pn1), d = Math.sqrt(1 - o * o), this.mode) {
      case O.OBLIQ:
        a.y = Math.asin(d * this.sinph0 + e.y * o * this.cosph0 / i), e.y = (d - this.sinph0 * Math.sin(a.y)) * i, e.x *= o * this.cosph0;
        break;
      case O.EQUIT:
        a.y = Math.asin(e.y * o / i), e.y = d * i, e.x *= o;
        break;
      case O.N_POLE:
        a.y = Math.asin(d), e.y = -e.y;
        break;
      case O.S_POLE:
        a.y = -Math.asin(d);
        break;
    }
    a.x = Math.atan2(e.x, e.y);
  }
  return e.x = a.x + this.long0, e.y = a.y, e;
}
var d3 = ["Tilted_Perspective", "tpers"], c3 = {
  init: n3,
  forward: i3,
  inverse: o3,
  names: d3
};
function r3() {
  if (this.flip_axis = this.sweep === "x" ? 1 : 0, this.h = Number(this.h), this.radius_g_1 = this.h / this.a, this.radius_g_1 <= 0 || this.radius_g_1 > 1e10)
    throw new Error();
  if (this.radius_g = 1 + this.radius_g_1, this.C = this.radius_g * this.radius_g - 1, this.es !== 0) {
    var e = 1 - this.es, a = 1 / e;
    this.radius_p = Math.sqrt(e), this.radius_p2 = e, this.radius_p_inv2 = a, this.shape = "ellipse";
  } else
    this.radius_p = 1, this.radius_p2 = 1, this.radius_p_inv2 = 1, this.shape = "sphere";
  this.title || (this.title = "Geostationary Satellite View");
}
function h3(e) {
  var a = e.x, t = e.y, s, n, i, d;
  if (a = a - this.long0, this.shape === "ellipse") {
    t = Math.atan(this.radius_p2 * Math.tan(t));
    var o = this.radius_p / V(this.radius_p * Math.cos(t), Math.sin(t));
    if (n = o * Math.cos(a) * Math.cos(t), i = o * Math.sin(a) * Math.cos(t), d = o * Math.sin(t), (this.radius_g - n) * n - i * i - d * d * this.radius_p_inv2 < 0)
      return e.x = Number.NaN, e.y = Number.NaN, e;
    s = this.radius_g - n, this.flip_axis ? (e.x = this.radius_g_1 * Math.atan(i / V(d, s)), e.y = this.radius_g_1 * Math.atan(d / s)) : (e.x = this.radius_g_1 * Math.atan(i / s), e.y = this.radius_g_1 * Math.atan(d / V(i, s)));
  } else this.shape === "sphere" && (s = Math.cos(t), n = Math.cos(a) * s, i = Math.sin(a) * s, d = Math.sin(t), s = this.radius_g - n, this.flip_axis ? (e.x = this.radius_g_1 * Math.atan(i / V(d, s)), e.y = this.radius_g_1 * Math.atan(d / s)) : (e.x = this.radius_g_1 * Math.atan(i / s), e.y = this.radius_g_1 * Math.atan(d / V(i, s))));
  return e.x = e.x * this.a, e.y = e.y * this.a, e;
}
function f3(e) {
  var a = -1, t = 0, s = 0, n, i, d, o;
  if (e.x = e.x / this.a, e.y = e.y / this.a, this.shape === "ellipse") {
    this.flip_axis ? (s = Math.tan(e.y / this.radius_g_1), t = Math.tan(e.x / this.radius_g_1) * V(1, s)) : (t = Math.tan(e.x / this.radius_g_1), s = Math.tan(e.y / this.radius_g_1) * V(1, t));
    var c = s / this.radius_p;
    if (n = t * t + c * c + a * a, i = 2 * this.radius_g * a, d = i * i - 4 * n * this.C, d < 0)
      return e.x = Number.NaN, e.y = Number.NaN, e;
    o = (-i - Math.sqrt(d)) / (2 * n), a = this.radius_g + o * a, t *= o, s *= o, e.x = Math.atan2(t, a), e.y = Math.atan(s * Math.cos(e.x) / a), e.y = Math.atan(this.radius_p_inv2 * Math.tan(e.y));
  } else if (this.shape === "sphere") {
    if (this.flip_axis ? (s = Math.tan(e.y / this.radius_g_1), t = Math.tan(e.x / this.radius_g_1) * Math.sqrt(1 + s * s)) : (t = Math.tan(e.x / this.radius_g_1), s = Math.tan(e.y / this.radius_g_1) * Math.sqrt(1 + t * t)), n = t * t + s * s + a * a, i = 2 * this.radius_g * a, d = i * i - 4 * n * this.C, d < 0)
      return e.x = Number.NaN, e.y = Number.NaN, e;
    o = (-i - Math.sqrt(d)) / (2 * n), a = this.radius_g + o * a, t *= o, s *= o, e.x = Math.atan2(t, a), e.y = Math.atan(s * Math.cos(e.x) / a);
  }
  return e.x = e.x + this.long0, e;
}
var l3 = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"], m3 = {
  init: r3,
  forward: h3,
  inverse: f3,
  names: l3
}, Le = 1.340264, qe = -0.081106, Ve = 893e-6, He = 3796e-6, Ba = Math.sqrt(3) / 2;
function u3() {
  this.es = 0, this.long0 = this.long0 !== void 0 ? this.long0 : 0, this.x0 = this.x0 !== void 0 ? this.x0 : 0, this.y0 = this.y0 !== void 0 ? this.y0 : 0;
}
function b3(e) {
  var a = M(e.x - this.long0, this.over), t = e.y, s = Math.asin(Ba * Math.sin(t)), n = s * s, i = n * n * n;
  return e.x = a * Math.cos(s) / (Ba * (Le + 3 * qe * n + i * (7 * Ve + 9 * He * n))), e.y = s * (Le + qe * n + i * (Ve + He * n)), e.x = this.a * e.x + this.x0, e.y = this.a * e.y + this.y0, e;
}
function w3(e) {
  e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a;
  var a = 1e-9, t = 12, s = e.y, n, i, d, o, c, r;
  for (r = 0; r < t && (n = s * s, i = n * n * n, d = s * (Le + qe * n + i * (Ve + He * n)) - e.y, o = Le + 3 * qe * n + i * (7 * Ve + 9 * He * n), s -= c = d / o, !(Math.abs(c) < a)); ++r)
    ;
  return n = s * s, i = n * n * n, e.x = Ba * e.x * (Le + 3 * qe * n + i * (7 * Ve + 9 * He * n)) / Math.cos(s), e.y = Math.asin(Math.sin(s) / Ba), e.x = M(e.x + this.long0, this.over), e;
}
var z3 = ["eqearth", "Equal Earth", "Equal_Earth"], p3 = {
  init: u3,
  forward: b3,
  inverse: w3,
  names: z3
}, Ze = 1e-10;
function _3() {
  var e;
  if (this.phi1 = this.lat1, Math.abs(this.phi1) < Ze)
    throw new Error();
  this.es ? (this.en = ft(this.es), this.m1 = Pe(
    this.phi1,
    this.am1 = Math.sin(this.phi1),
    e = Math.cos(this.phi1),
    this.en
  ), this.am1 = e / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1), this.inverse = g3, this.forward = v3) : (Math.abs(this.phi1) + Ze >= _ ? this.cphi1 = 0 : this.cphi1 = 1 / Math.tan(this.phi1), this.inverse = M3, this.forward = y3);
}
function v3(e) {
  var a = M(e.x - (this.long0 || 0), this.over), t = e.y, s, n, i;
  return s = this.am1 + this.m1 - Pe(t, n = Math.sin(t), i = Math.cos(t), this.en), n = i * a / (s * Math.sqrt(1 - this.es * n * n)), e.x = s * Math.sin(n), e.y = this.am1 - s * Math.cos(n), e.x = this.a * e.x + (this.x0 || 0), e.y = this.a * e.y + (this.y0 || 0), e;
}
function g3(e) {
  e.x = (e.x - (this.x0 || 0)) / this.a, e.y = (e.y - (this.y0 || 0)) / this.a;
  var a, t, s, n;
  if (t = V(e.x, e.y = this.am1 - e.y), n = lt(this.am1 + this.m1 - t, this.es, this.en), (a = Math.abs(n)) < _)
    a = Math.sin(n), s = t * Math.atan2(e.x, e.y) * Math.sqrt(1 - this.es * a * a) / Math.cos(n);
  else if (Math.abs(a - _) <= Ze)
    s = 0;
  else
    throw new Error();
  return e.x = M(s + (this.long0 || 0), this.over), e.y = fe(n), e;
}
function y3(e) {
  var a = M(e.x - (this.long0 || 0), this.over), t = e.y, s, n;
  return n = this.cphi1 + this.phi1 - t, Math.abs(n) > Ze ? (e.x = n * Math.sin(s = a * Math.cos(t) / n), e.y = this.cphi1 - n * Math.cos(s)) : e.x = e.y = 0, e.x = this.a * e.x + (this.x0 || 0), e.y = this.a * e.y + (this.y0 || 0), e;
}
function M3(e) {
  e.x = (e.x - (this.x0 || 0)) / this.a, e.y = (e.y - (this.y0 || 0)) / this.a;
  var a, t, s = V(e.x, e.y = this.cphi1 - e.y);
  if (t = this.cphi1 + this.phi1 - s, Math.abs(t) > _)
    throw new Error();
  return Math.abs(Math.abs(t) - _) <= Ze ? a = 0 : a = s * Math.atan2(e.x, e.y) / Math.cos(t), e.x = M(a + (this.long0 || 0), this.over), e.y = fe(t), e;
}
var C3 = ["bonne", "Bonne (Werner lat_1=90)"], B3 = {
  init: _3,
  names: C3
};
const $t = {
  OBLIQUE: {
    forward: P3,
    inverse: x3
  },
  TRANSVERSE: {
    forward: G3,
    inverse: U3
  }
}, ka = {
  ROTATE: {
    o_alpha: "oAlpha",
    o_lon_c: "oLongC",
    o_lat_c: "oLatC"
  },
  NEW_POLE: {
    o_lat_p: "oLatP",
    o_lon_p: "oLongP"
  },
  NEW_EQUATOR: {
    o_lon_1: "oLong1",
    o_lat_1: "oLat1",
    o_lon_2: "oLong2",
    o_lat_2: "oLat2"
  }
};
function k3() {
  if (this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.title = this.title || "General Oblique Transformation", this.isIdentity = zs.includes(this.o_proj), !this.o_proj)
    throw new Error("Missing parameter: o_proj");
  if (this.o_proj === "ob_tran")
    throw new Error("Invalid value for o_proj: " + this.o_proj);
  const e = this.projStr.replace("+proj=ob_tran", "").replace("+o_proj=", "+proj=").trim(), a = Q(e);
  if (!a)
    throw new Error("Invalid parameter: o_proj. Unknown projection " + this.o_proj);
  a.long0 = 0, this.obliqueProjection = a;
  let t;
  const s = Object.keys(ka), n = (o) => {
    if (typeof this[o] > "u")
      return;
    const c = parseFloat(this[o]) * U;
    if (isNaN(c))
      throw new Error("Invalid value for " + o + ": " + this[o]);
    return c;
  };
  for (let o = 0; o < s.length; o++) {
    const c = s[o], r = ka[c], l = Object.entries(r);
    if (l.some(
      ([h]) => typeof this[h] < "u"
    )) {
      t = r;
      for (let h = 0; h < l.length; h++) {
        const [u, m] = l[h], b = n(u);
        if (typeof b > "u")
          throw new Error("Missing parameter: " + u + ".");
        this[m] = b;
      }
      break;
    }
  }
  if (!t)
    throw new Error("No valid parameters provided for ob_tran projection.");
  const { lamp: i, phip: d } = A3(this, t);
  this.lamp = i, Math.abs(d) > y ? (this.cphip = Math.cos(d), this.sphip = Math.sin(d), this.projectionType = $t.OBLIQUE) : this.projectionType = $t.TRANSVERSE;
}
function S3(e) {
  return this.projectionType.forward(this, e);
}
function E3(e) {
  return this.projectionType.inverse(this, e);
}
function A3(e, a) {
  let t, s;
  if (a === ka.ROTATE) {
    let n = e.oLongC, i = e.oLatC, d = e.oAlpha;
    if (Math.abs(Math.abs(i) - _) <= y)
      throw new Error("Invalid value for o_lat_c: " + e.o_lat_c + " should be < 90°");
    s = n + Math.atan2(-1 * Math.cos(d), -1 * Math.sin(d) * Math.sin(i)), t = Math.asin(Math.cos(i) * Math.sin(d));
  } else if (a === ka.NEW_POLE)
    s = e.oLongP, t = e.oLatP;
  else {
    let n = e.oLong1, i = e.oLat1, d = e.oLong2, o = e.oLat2, c = Math.abs(i);
    if (Math.abs(i) > _ - y)
      throw new Error("Invalid value for o_lat_1: " + e.o_lat_1 + " should be < 90°");
    if (Math.abs(o) > _ - y)
      throw new Error("Invalid value for o_lat_2: " + e.o_lat_2 + " should be < 90°");
    if (Math.abs(i - o) < y)
      throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");
    if (c < y)
      throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");
    s = Math.atan2(
      Math.cos(i) * Math.sin(o) * Math.cos(n) - Math.sin(i) * Math.cos(o) * Math.cos(d),
      Math.sin(i) * Math.cos(o) * Math.sin(d) - Math.cos(i) * Math.sin(o) * Math.sin(n)
    ), t = Math.atan(-1 * Math.cos(s - n) / Math.tan(i));
  }
  return { lamp: s, phip: t };
}
function P3(e, a) {
  let { x: t, y: s } = a;
  t += e.long0;
  const n = Math.cos(t), i = Math.sin(s), d = Math.cos(s);
  a.x = M(
    Math.atan2(
      d * Math.sin(t),
      e.sphip * d * n + e.cphip * i
    ) + e.lamp
  ), a.y = Math.asin(
    e.sphip * i - e.cphip * d * n
  );
  const o = e.obliqueProjection.forward(a);
  return e.isIdentity && (o.x *= $, o.y *= $), o;
}
function G3(e, a) {
  let { x: t, y: s } = a;
  t += e.long0;
  const n = Math.cos(s), i = Math.cos(t);
  a.x = M(
    Math.atan2(
      n * Math.sin(t),
      Math.sin(s)
    ) + e.lamp
  ), a.y = Math.asin(-1 * n * i);
  const d = e.obliqueProjection.forward(a);
  return e.isIdentity && (d.x *= $, d.y *= $), d;
}
function x3(e, a) {
  e.isIdentity && (a.x *= U, a.y *= U);
  const t = e.obliqueProjection.inverse(a);
  let { x: s, y: n } = t;
  if (s < Number.MAX_VALUE) {
    s -= e.lamp;
    const i = Math.cos(s), d = Math.sin(n), o = Math.cos(n);
    a.x = Math.atan2(
      o * Math.sin(s),
      e.sphip * o * i - e.cphip * d
    ), a.y = Math.asin(
      e.sphip * d + e.cphip * o * i
    );
  }
  return a.x = M(a.x + e.long0), a;
}
function U3(e, a) {
  e.isIdentity && (a.x *= U, a.y *= U);
  const t = e.obliqueProjection.inverse(a);
  let { x: s, y: n } = t;
  if (s < Number.MAX_VALUE) {
    const i = Math.cos(n);
    s -= e.lamp, a.x = Math.atan2(
      i * Math.sin(s),
      -1 * Math.sin(n)
    ), a.y = Math.asin(
      i * Math.cos(s)
    );
  }
  return a.x = M(a.x + e.long0), a;
}
var I3 = ["General Oblique Transformation", "General_Oblique_Transformation", "ob_tran"], T3 = {
  init: k3,
  forward: S3,
  inverse: E3,
  names: I3
};
function N3(e) {
  e.Proj.projections.add(ba), e.Proj.projections.add(wa), e.Proj.projections.add(Mi), e.Proj.projections.add(xi), e.Proj.projections.add(ji), e.Proj.projections.add(Li), e.Proj.projections.add(Xi), e.Proj.projections.add(Zi), e.Proj.projections.add(n0), e.Proj.projections.add(r0), e.Proj.projections.add(y0), e.Proj.projections.add(E0), e.Proj.projections.add(U0), e.Proj.projections.add(O0), e.Proj.projections.add(V0), e.Proj.projections.add(Y0), e.Proj.projections.add(eo), e.Proj.projections.add(io), e.Proj.projections.add(lo), e.Proj.projections.add(zo), e.Proj.projections.add(yo), e.Proj.projections.add(So), e.Proj.projections.add(Io), e.Proj.projections.add(Oo), e.Proj.projections.add(Vo), e.Proj.projections.add(Qo), e.Proj.projections.add(s3), e.Proj.projections.add(c3), e.Proj.projections.add(m3), e.Proj.projections.add(p3), e.Proj.projections.add(B3), e.Proj.projections.add(T3);
}
const pt = Object.assign(D2, {
  defaultDatum: "WGS84",
  Proj: Q,
  WGS84: new Q("WGS84"),
  Point: Se,
  toPoint: Ms,
  defs: j,
  nadgrid: y2,
  transform: ya,
  mgrs: F2,
  version: "__VERSION__"
});
N3(pt);
const Ts = "+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +units=m +no_defs", H = 512, Sa = 1e7, j3 = (e) => pt("EPSG:4326", Ts, e), R3 = (e) => pt(Ts, "EPSG:4326", e), O3 = (e, a, t = H) => [[e, a], [e + t, a], [e + t, a - t], [e, a - t]].map(R3);
function D3(e, a) {
  let t = !1;
  for (let s = 0, n = a.length - 1; s < a.length; n = s++) {
    const i = a[s], d = a[n];
    i[1] > e[1] != d[1] > e[1] && e[0] < (d[0] - i[0]) * (e[1] - i[1]) / (d[1] - i[1]) + i[0] && (t = !t);
  }
  return t;
}
function F3(e) {
  if (!e?.length) throw Error("Import a GeoPDF to analyse its map area.");
  return e.map((a) => {
    if (![a.west, a.south, a.east, a.north].every(Number.isFinite) || !(166 <= a.west && a.west < a.east && a.east <= 180 && -48 <= a.south && a.south < a.north && a.north <= -33)) throw Error("This map is outside New Zealand LINZ coverage.");
    return (a.coordinates ?? [[a.west, a.north], [a.east, a.north], [a.east, a.south], [a.west, a.south]]).map(j3);
  });
}
function* L3(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of e) {
    const s = t.map((i) => i[0]), n = t.map((i) => i[1]);
    for (let i = Math.floor(Math.min(...s) / H); i <= Math.floor(Math.max(...s) / H); i++)
      for (let d = Math.floor((Sa - Math.max(...n)) / H); d <= Math.floor((Sa - Math.min(...n)) / H); d++) {
        const o = `${i}:${d}`;
        a.has(o) || (a.add(o), yield { column: i, row: d });
      }
  }
}
async function q3(e, a, t, s) {
  const n = a * H, i = Sa - t * H, d = H + 2, o = new Float64Array(d * d).fill(NaN), c = O3(n - 1, i + 1, H + 2), r = c.map((h) => h[0]), l = c.map((h) => h[1]), f = e.filter((h) => h.bounds[0] < Math.max(...r) && h.bounds[2] > Math.min(...r) && h.bounds[1] < Math.max(...l) && h.bounds[3] > Math.min(...l));
  for (const h of f) {
    s?.throwIfAborted();
    const m = await (await P1(h.url, { allowFullFile: !1, cacheSize: 16, blockSize: 65536 }, s)).getImage(), [b, w] = m.getOrigin(), [p, v] = m.getResolution();
    if (m.getGeoKeys().ProjectedCSTypeGeoKey !== 2193 || p !== 1 || v !== -1 || Math.abs(b - Math.round(b)) > 1e-6 || Math.abs(w - Math.round(w)) > 1e-6 || m.getFileDirectory().ModelTransformation) throw Error("LINZ source must be an aligned NZTM 1 m elevation grid.");
    const C = Math.round(n - 1 - b), k = Math.round(w - i - 1), g = await m.readRasters({ window: [C, k, C + d, k + d], samples: [0], interleave: !0, fillValue: NaN, signal: s }), B = m.getGDALNoData();
    for (let S = 0; S < o.length; S++) !Number.isFinite(o[S]) && Number.isFinite(g[S]) && g[S] !== B && (o[S] = g[S]);
  }
  return o;
}
self.onmessage = async ({ data: e }) => {
  try {
    const a = F3([e]), t = a.flat(), s = t.map((h) => h[0]), n = t.map((h) => h[1]), i = Math.floor(Math.min(...s)), d = Math.ceil(Math.max(...n)), o = Math.ceil(Math.max(...s)) - i, c = d - Math.floor(Math.min(...n));
    if (o * c > 25e6) throw Error("Optional DEM exceeds the 25 million cell browser limit; core files are still available.");
    const r = new Float32Array(o * c).fill(-9999);
    let l = 0;
    for (const { column: h, row: u } of L3(a)) {
      self.postMessage({ progress: `Reading DEM tile ${++l}…` });
      const m = await q3(x1, h, u, AbortSignal.timeout(6e4));
      for (let b = 0; b < H; b++) for (let w = 0; w < H; w++) {
        const p = h * H + w, v = Sa - u * H - b, C = p - i, k = d - v;
        if (C < 0 || k < 0 || C >= o || k >= c || !D3([p + 0.5, v - 0.5], a[0])) continue;
        const g = m[(b + 1) * (H + 2) + w + 1];
        Number.isFinite(g) && (r[k * o + C] = g);
      }
    }
    const f = new Uint8Array(G1(r, { width: o, height: c, ModelPixelScale: [1, 1, 0], ModelTiepoint: [0, 0, 0, i, d, 0], GTModelTypeGeoKey: 1, GTRasterTypeGeoKey: 1, ProjectedCSTypeGeoKey: 2193, ProjLinearUnitsGeoKey: 9001, VerticalUnitsGeoKey: 9001, GDAL_NODATA: "-9999" }));
    self.postMessage({ bytes: f }, [f.buffer]);
  } catch (a) {
    self.postMessage({ error: a.message });
  }
};
export {
  H3 as L,
  V3 as a
};
