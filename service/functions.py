import os
import cv2
from matplotlib import pyplot as plt
import numpy as np
import pydicom


def extract_roi(image):
    if len(image.shape) > 2:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY).astype(np.uint8)
    else:
        gray = image.astype(np.uint8)

    ret, gray = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY_INV)
    gray = cv2.morphologyEx(
        gray, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (128, 128))
    )
    gray = cv2.bitwise_not(gray)

    contours, hierarchy = cv2.findContours(gray, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contour = max(contours, key=cv2.contourArea)

    x, y, w, h = cv2.boundingRect(contour)
    roi = image[y : y + h, x : x + w]

    return roi


def resize_image(image, width=None, height=None, inter=cv2.INTER_LINEAR):
    (h, w) = image.shape[:2]

    if width is None and height is None:
        return image

    if width is None:
        r = height / float(h)
        dim = (int(w * r), height)
    else:
        r = width / float(w)
        dim = (width, int(h * r))

    image = cv2.resize(image, dim, interpolation=inter)

    return image


def read_dicom(
    path,
    image_size=None,
    voi_lut=True,
    fix_monochrome=True,
    keep_aspect_ratio=True,
    crop_roi=True,
):
    dicom = pydicom.dcmread(path)
    data = dicom.pixel_array
    original_data = data

    if voi_lut:
        data = pydicom.pixel_data_handlers.util.apply_voi_lut(dicom.pixel_array, dicom)

    if fix_monochrome and dicom.PhotometricInterpretation == "MONOCHROME1":
        data = np.amax(data) - data

    if crop_roi:
        data = extract_roi(data)

    if image_size:
        if keep_aspect_ratio:
            h, w = data.shape

            if w > h:
                data = resize_image(data, width=image_size)
            else:
                data = resize_image(data, height=image_size)
        else:
            data = cv2.resize(data, (image_size, image_size))

    return data, original_data


def data_returner(path):
    image_size = None
    voi_lut = True
    fix_monochrome = True
    keep_aspect_ratio = True
    crop_roi = True

    img_path = path
    if os.path.exists(img_path):
        # print(img_path)
        if img_path.endswith(".dcm"):
            image, original_data = read_dicom(
                img_path,
                image_size=None,
                voi_lut=True,
                fix_monochrome=True,
                keep_aspect_ratio=True,
                crop_roi=True,
            )
            image = cv2.resize(image, (224, 224))

            # Normalization
            mean = np.mean(image)
            std = np.std(image)
            image = (image - mean) / std
           
    return image
